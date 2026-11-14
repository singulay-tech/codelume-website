import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

type PaddleClient = {
  Environment: { set: (environment: 'sandbox') => void }
  Initialize: (options: { token: string; eventCallback: (event: { name: string }) => void }) => void
  Checkout: { open: (options: { transactionId: string }) => void; close: () => void }
}
declare global { interface Window { Paddle?: PaddleClient } }
let paddleLoading: Promise<PaddleClient> | undefined
let initialized = false
let handleEvent: ((event: { name: string }) => void) | undefined

function loadPaddle(): Promise<PaddleClient> {
  paddleLoading ??= new Promise((resolve, reject) => {
    if (window.Paddle) { resolve(window.Paddle); return }
    const script = document.createElement('script')
    script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js'
    script.async = true
    script.onload = () => window.Paddle ? resolve(window.Paddle) : reject(new Error('Checkout unavailable'))
    script.onerror = () => { paddleLoading = undefined; script.remove(); reject(new Error('Checkout unavailable')) }
    document.head.appendChild(script)
  })
  return paddleLoading
}

export function CheckoutPage() {
  const { i18n } = useTranslation()
  const chinese = i18n.language.startsWith('zh')
  const [state, setState] = useState<'loading' | 'ready' | 'completed' | 'error'>('loading')
  const transactionId = new URLSearchParams(window.location.search).get('_ptxn') ?? ''
  const token = import.meta.env.VITE_PADDLE_CLIENT_TOKEN as string | undefined
  const environment = import.meta.env.VITE_PADDLE_ENVIRONMENT as string | undefined
  const tokenPattern = environment === 'sandbox' ? /^test_[a-zA-Z0-9_]+$/ : /^live_[a-zA-Z0-9_]+$/
  const valid = (environment === 'live' || environment === 'sandbox') &&
    typeof token === 'string' && tokenPattern.test(token) && /^txn_[a-z0-9]{26}$/.test(transactionId)

  useEffect(() => {
    if (!valid || !token) { setState('error'); return }
    let active = true
    loadPaddle().then(paddle => {
      if (!active) return
      handleEvent = event => {
        if (!active) return
        if (event.name === 'checkout.completed') setState('completed')
        else if (event.name === 'checkout.error') setState('error')
      }
      setState('ready')
      if (!initialized) {
        if (environment === 'sandbox') paddle.Environment.set('sandbox')
        // Paddle automatically opens the server-created transaction in _ptxn.
        paddle.Initialize({ token, eventCallback: event => handleEvent?.(event) })
        initialized = true
      } else {
        paddle.Checkout.open({ transactionId })
      }
    }).catch(() => { if (active) setState('error') })
    return () => { active = false; handleEvent = undefined; window.Paddle?.Checkout.close() }
  }, [environment, token, transactionId, valid])

  const message = state === 'completed'
    ? (chinese ? '支付已提交，请返回码镜。付款确认后会自动开通 Pro。' : 'Payment submitted. Return to Codelume. Pro activates after payment is confirmed.')
    : state === 'error'
      ? (chinese ? '暂时无法打开付款页面。请返回码镜，重新点击购买。' : 'Checkout is unavailable. Return to Codelume and start your purchase again.')
      : (chinese ? '请在付款窗口中完成购买。Pro 将开通到发起购买时登录的码镜账号。' : 'Complete your purchase in the checkout window. Pro will be added to the Codelume account that started this purchase.')

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="w-full max-w-md space-y-6 text-center">
        <img src="/codelume-icon.svg" alt="Codelume" className="w-16 h-16 mx-auto" />
        <h1 className="text-3xl font-semibold">Codelume Pro</h1>
        <p className="text-muted-foreground leading-relaxed" role="status">{message}</p>
        {state === 'ready' && <button className="rounded-full bg-primary text-primary-foreground px-6 py-3"
          onClick={() => window.Paddle?.Checkout.open({ transactionId })}>
          {chinese ? '继续付款' : 'Continue checkout'}
        </button>}
        <div className="flex gap-6 justify-center text-sm underline">
          <Link to="/">{chinese ? '返回官网' : 'Home'}</Link>
          <a href="mailto:codelume@163.com">{chinese ? '联系支持' : 'Contact support'}</a>
        </div>
      </div>
    </main>
  )
}
