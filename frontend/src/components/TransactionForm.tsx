import { useState } from 'react'
import { ArrowDownLeft, ArrowUpRight, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface TransactionFormProps {
  type: 'deposit' | 'withdraw'
  onSubmit: (amount: string) => Promise<boolean>
  maxAmount?: string
  disabled?: boolean
}

export const TransactionForm = ({ 
  type, 
  onSubmit, 
  maxAmount, 
  disabled 
}: TransactionFormProps) => {
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  const isDeposit = type === 'deposit'
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || parseFloat(amount) <= 0) return

    setLoading(true)
    try {
      const success = await onSubmit(amount)
      if (success) {
        setAmount('')
      }
    } finally {
      setLoading(false)
    }
  }

  const setMaxAmount = () => {
    if (maxAmount) {
      setAmount(maxAmount)
    }
  }

  const validateAmount = () => {
    const num = parseFloat(amount)
    if (isNaN(num) || num <= 0) return false
    if (!isDeposit && maxAmount && num > parseFloat(maxAmount)) return false
    return true
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${
          isDeposit 
            ? 'bg-success-100 text-success-600' 
            : 'bg-warning-100 text-warning-600'
        }`}>
          {isDeposit ? (
            <ArrowDownLeft className="w-5 h-5" />
          ) : (
            <ArrowUpRight className="w-5 h-5" />
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 capitalize">
            {type} ETH
          </h3>
          <p className="text-sm text-gray-500">
            {isDeposit 
              ? 'Add funds to your Cool Bank account' 
              : 'Withdraw funds from your account'
            }
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Amount (ETH)
          </label>
          <div className="relative">
            <input
              id="amount"
              type="number"
              step="0.0001"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0000"
              disabled={disabled || loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
            />
            {!isDeposit && maxAmount && parseFloat(maxAmount) > 0 && (
              <button
                type="button"
                onClick={setMaxAmount}
                disabled={disabled || loading}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs font-medium text-primary-600 hover:text-primary-700 disabled:opacity-50"
              >
                MAX
              </button>
            )}
          </div>
          
          {!isDeposit && maxAmount && (
            <p className="text-xs text-gray-500 mt-1">
              Available: {parseFloat(maxAmount).toFixed(4)} ETH
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={disabled || loading || !validateAmount()}
          className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            isDeposit
              ? 'bg-success-600 hover:bg-success-700 text-white'
              : 'bg-warning-600 hover:bg-warning-700 text-white'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              {isDeposit ? (
                <ArrowDownLeft className="w-4 h-4" />
              ) : (
                <ArrowUpRight className="w-4 h-4" />
              )}
              <span>{isDeposit ? 'Deposit' : 'Withdraw'}</span>
            </>
          )}
        </button>
      </form>
    </motion.div>
  )
}
