/** cn 区 Mac App Store：码镜（场景动态壁纸） */
export const CODELUME_MAC_APP_STORE_URL =
  'https://apps.apple.com/cn/app/%E7%A0%81%E9%95%9C-%E5%8A%A8%E6%80%81%E5%A3%81%E7%BA%B8/id6751061329?mt=12'

function websiteDownloadURL(): string | null {
  const value = import.meta.env.VITE_CODELUME_MAC_DOWNLOAD_URL
  if (typeof value !== 'string' || !value.trim()) return null
  try {
    const url = new URL(value.trim())
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : null
  } catch {
    return null
  }
}

export const CODELUME_WEBSITE_DOWNLOAD_URL = websiteDownloadURL()
