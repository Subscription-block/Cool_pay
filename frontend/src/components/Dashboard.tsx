import { useAppKitAccount } from '@reown/appkit/react'
import { useCoolBank } from '@/hooks/useCoolBank'
import { BalanceCard } from './BalanceCard'
import { TransactionForm } from './TransactionForm'
import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle } from 'lucide-react'

export const Dashboard = () => {
  const { isConnected } = useAppKitAccount()
  const { 
    bankingData, 
    loading, 
    deposit, 
    withdraw, 
    fetchBankingData, 
    isContractReady 
  } = useCoolBank()

  if (!isConnected) {
    return null
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Banner */}
        {isConnected && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {isContractReady ? (
              <div className="flex items-center space-x-2 bg-success-50 border border-success-200 rounded-lg px-4 py-3">
                <CheckCircle className="w-5 h-5 text-success-600" />
                <span className="text-success-800 font-medium">
                  Connected to Cool Bank
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 bg-warning-50 border border-warning-200 rounded-lg px-4 py-3">
                <AlertCircle className="w-5 h-5 text-warning-600" />
                <span className="text-warning-800 font-medium">
                  Connecting to contract...
                </span>
              </div>
            )}
          </motion.div>
        )}

        {/* Balance Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <BalanceCard
            title="My Balance"
            balance={bankingData.balance}
            subtitle="Your Cool Bank account balance"
            loading={loading}
            onRefresh={fetchBankingData}
            gradient="from-primary-500 to-primary-600"
          />
          
          <BalanceCard
            title="Total Deposits"
            balance={bankingData.totalDeposits}
            subtitle="Total ETH deposited in Cool Bank"
            loading={loading}
            gradient="from-success-500 to-success-600"
          />
          
          <BalanceCard
            title="Contract Balance"
            balance={bankingData.contractBalance}
            subtitle="Total ETH held by the contract"
            loading={loading}
            gradient="from-purple-500 to-purple-600"
          />
        </div>

        {/* Transaction Forms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TransactionForm
            type="deposit"
            onSubmit={deposit}
            disabled={!isContractReady}
          />
          
          <TransactionForm
            type="withdraw"
            onSubmit={withdraw}
            maxAmount={bankingData.balance}
            disabled={!isContractReady || parseFloat(bankingData.balance) === 0}
          />
        </div>

        {/* Owner Badge */}
        {bankingData.isOwner && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white text-center"
          >
            <h3 className="text-lg font-semibold mb-2">Contract Owner</h3>
            <p className="text-purple-100">
              You are the owner of this Cool Bank contract
            </p>
          </motion.div>
        )}

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Stats
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">
                {parseFloat(bankingData.balance) > 0 ? '✓' : '○'}
              </div>
              <div className="text-sm text-gray-600">Has Balance</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-success-600">
                {bankingData.isOwner ? '👑' : '👤'}
              </div>
              <div className="text-sm text-gray-600">
                {bankingData.isOwner ? 'Owner' : 'User'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {parseFloat(bankingData.totalDeposits).toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Total ETH</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">
                {isContractReady ? '🟢' : '🟡'}
              </div>
              <div className="text-sm text-gray-600">Contract Status</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
