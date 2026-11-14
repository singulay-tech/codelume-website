import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { DownloadPage } from './pages/DownloadPage'
import { WorkshopPage } from './pages/WorkshopPage'
import { HelpPage } from './pages/HelpPage'
import { HelpDocPage } from './pages/HelpDocPage'
import { LegalDocPage } from './pages/LegalDocPage'
import { CheckoutPage } from './pages/CheckoutPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/workshop" element={<WorkshopPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/help/wallpaperPolicy" element={<Navigate to="/help/wallpaperProtocol" replace />} />
        <Route path="/help/:docKey" element={<HelpDocPage />} />
        <Route path="/legal/:docKey" element={<LegalDocPage />} />
      </Routes>
    </BrowserRouter>
  )
}
