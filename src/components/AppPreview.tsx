import { useTranslation } from 'react-i18next'

import { WallpaperDemoVideo } from './WallpaperDemoVideo'
import recording from '../assets/codelume-app-preview.mp4'
import poster from '../assets/codelume-app-preview-poster.webp'

export function AppPreview() {
  const { t } = useTranslation('navigation')
  const title = t('appPreview')

  return (
    <section aria-labelledby="app-preview-title" className="px-5 pt-14 sm:px-8 sm:pt-20 lg:px-12">
      <div id="app-preview" className="mx-auto w-full max-w-[min(72rem,calc(max(12rem,100svh_-_13rem)*1920/1246))] scroll-mt-28">
        <h2 id="app-preview-title" className="mb-4 text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        <div className="relative aspect-[1920/1246] overflow-hidden rounded-2xl border card-surface-lavender shadow-sm sm:rounded-3xl">
          <WallpaperDemoVideo src={recording} poster={poster} label={title} />
        </div>
      </div>
    </section>
  )
}
