import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../App.tsx'
import './index.css'
import { MobileUtils } from './utils/mobileUtils'

// Initialize mobile optimizations
MobileUtils.init();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) 
