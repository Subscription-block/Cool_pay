import { useAppKitAccount } from '@reown/appkit/react'
import { Toaster } from 'react-hot-toast'
import { Header } from './components/Header'
import { WelcomeScreen } from './components/WelcomeScreen'
import { Dashboard } from './components/Dashboard'
import './config/walletConnect' // Initialize WalletConnect

function App() {
  const { isConnected } = useAppKitAccount()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {isConnected ? <Dashboard /> : <WelcomeScreen />}
      </main>

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#374151',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  )
}

export default App
