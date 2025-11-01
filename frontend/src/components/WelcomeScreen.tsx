import { Banknote, Shield, Zap, Globe, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export const WelcomeScreen = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Transparent',
      description: 'Built on Ethereum blockchain with smart contract security'
    },
    {
      icon: Zap,
      title: 'Fast Transactions',
      description: 'Quick deposits and withdrawals with real-time balance updates'
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Send and receive digital assets anywhere in the world'
    }
  ]

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl shadow-lg">
                <Banknote className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                  Cool Bank
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
                A modern blockchain-based banking application for secure digital payments
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mt-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl mb-4 mx-auto">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-6 mt-12"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Get Started
              </h3>
              <p className="text-gray-600 mb-6">
                Connect your wallet to start using Cool Bank's digital banking features
              </p>
              
              <div className="flex items-center justify-center">
                <w3m-button />
              </div>
            </div>

            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <span>Powered by Ethereum</span>
              <ArrowRight className="w-4 h-4" />
              <span>Secured by Smart Contracts</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
