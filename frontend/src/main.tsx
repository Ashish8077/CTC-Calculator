import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CtcProvider } from './store/ctcContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CtcProvider>
      <App />
    </CtcProvider>
  </StrictMode>
)
