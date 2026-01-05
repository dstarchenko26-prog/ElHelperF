import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'

import 'katex/dist/katex.min.css';

import Loader from '@/components/Loader.jsx'
import { AuthProvider } from '@/context/AuthContext'

import App from '@/App.jsx'
import '@/index.css'
import '@/i18n'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <HashRouter>
        <AuthProvider>
          
          <App />
          
        </AuthProvider>
      </HashRouter>
    </Suspense>
  </React.StrictMode>,
)
