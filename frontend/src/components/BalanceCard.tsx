import { Eye, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'

interface BalanceCardProps {
  title: string
  balance: string
  subtitle?: string
  loading?: boolean
  onRefresh?: () => void
  gradient?: string
}

export const BalanceCard = ({ 
  title, 
  balance, 
  subtitle, 
  loading, 
  onRefresh,
  gradient = "from-primary-500 to-primary-600"
}: BalanceCardProps) => {
  const formatBalance = (bal: string) => {
    const num = parseFloat(bal)
    return num.toFixed(4)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100"
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`} />
      
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-gray-600" />
            <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              {title}
            </h3>
          </div>
          
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 text-gray-500 ${loading ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-gray-900">
              {loading ? (
                <div className="animate-pulse bg-gray-200 h-8 w-32 rounded" />
              ) : (
                formatBalance(balance)
              )}
            </span>
            <span className="text-lg font-medium text-gray-500">ETH</span>
          </div>
          
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
