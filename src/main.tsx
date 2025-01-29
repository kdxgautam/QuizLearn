import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router";
// import ReactDOM from 'react-dom/client'
import Header from './components/Header.tsx'
import Sidebar from './components/Sidebar.tsx'
import Footer from './components/Footer.tsx'
// import { ClerkProvider } from '@clerk/clerk-react'
import ReactDOM from 'react-dom/client'








ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
        {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/"> */}
    <BrowserRouter>

  <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-4 md:p-6 pt-[89px] lg:pt-[73px]">
    <App />
    </main>
    <Footer/>
      </div>
    </div>
    </BrowserRouter>
    {/* </ClerkProvider> */}
  </StrictMode>,
)
