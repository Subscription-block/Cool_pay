import { useState, useEffect, useCallback } from 'react'
import { ethers } from 'ethers'
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import { COOL_BANK_ABI, CONTRACT_ADDRESSES, type SupportedChainId } from '@/config/contracts'
import toast from 'react-hot-toast'

export interface BankingData {
  balance: string
  totalDeposits: string
  contractBalance: string
  isOwner: boolean
}

export const useCoolBank = () => {
  const { address, isConnected } = useAppKitAccount()
  const { walletProvider } = useAppKitProvider('eip155')
  
  const [bankingData, setBankingData] = useState<BankingData>({
    balance: '0',
    totalDeposits: '0',
    contractBalance: '0',
    isOwner: false,
  })
  const [loading, setLoading] = useState(false)
  const [contract, setContract] = useState<ethers.Contract | null>(null)

  // Initialize contract
  useEffect(() => {
    const initContract = async () => {
      if (!walletProvider || !isConnected) {
        setContract(null)
        return
      }

      try {
        const ethersProvider = new ethers.BrowserProvider(walletProvider)
        const network = await ethersProvider.getNetwork()
        const chainId = Number(network.chainId) as SupportedChainId
        
        const contractAddress = CONTRACT_ADDRESSES[chainId]
        if (!contractAddress) {
          toast.error(`Contract not deployed on network ${chainId}`)
          return
        }

        const signer = await ethersProvider.getSigner()
        const coolBankContract = new ethers.Contract(contractAddress, COOL_BANK_ABI, signer)
        setContract(coolBankContract)
      } catch (error) {
        console.error('Error initializing contract:', error)
        toast.error('Failed to initialize contract')
      }
    }

    initContract()
  }, [walletProvider, isConnected])

  // Fetch banking data
  const fetchBankingData = useCallback(async () => {
    if (!contract || !address) return

    try {
      setLoading(true)
      
      const [balance, totalDeposits, contractBalance, owner] = await Promise.all([
        contract.getMyBalance(),
        contract.totalDeposits(),
        contract.getContractBalance(),
        contract.owner(),
      ])

      setBankingData({
        balance: ethers.formatEther(balance),
        totalDeposits: ethers.formatEther(totalDeposits),
        contractBalance: ethers.formatEther(contractBalance),
        isOwner: owner.toLowerCase() === address.toLowerCase(),
      })
    } catch (error) {
      console.error('Error fetching banking data:', error)
      toast.error('Failed to fetch banking data')
    } finally {
      setLoading(false)
    }
  }, [contract, address])

  // Deposit ETH
  const deposit = useCallback(async (amount: string) => {
    if (!contract) {
      toast.error('Contract not initialized')
      return false
    }

    try {
      const value = ethers.parseEther(amount)
      const tx = await contract.deposit({ value })
      
      toast.loading('Processing deposit...', { id: 'deposit' })
      await tx.wait()
      
      toast.success('Deposit successful!', { id: 'deposit' })
      await fetchBankingData()
      return true
    } catch (error: any) {
      console.error('Deposit error:', error)
      toast.error(error.reason || 'Deposit failed', { id: 'deposit' })
      return false
    }
  }, [contract, fetchBankingData])

  // Withdraw ETH
  const withdraw = useCallback(async (amount: string) => {
    if (!contract) {
      toast.error('Contract not initialized')
      return false
    }

    try {
      const value = ethers.parseEther(amount)
      const tx = await contract.withdraw(value)
      
      toast.loading('Processing withdrawal...', { id: 'withdraw' })
      await tx.wait()
      
      toast.success('Withdrawal successful!', { id: 'withdraw' })
      await fetchBankingData()
      return true
    } catch (error: any) {
      console.error('Withdrawal error:', error)
      toast.error(error.reason || 'Withdrawal failed', { id: 'withdraw' })
      return false
    }
  }, [contract, fetchBankingData])

  // Get balance of specific address
  const getBalance = useCallback(async (userAddress: string) => {
    if (!contract) return '0'

    try {
      const balance = await contract.getBalance(userAddress)
      return ethers.formatEther(balance)
    } catch (error) {
      console.error('Error getting balance:', error)
      return '0'
    }
  }, [contract])

  // Transfer ownership (owner only)
  const transferOwnership = useCallback(async (newOwner: string) => {
    if (!contract) {
      toast.error('Contract not initialized')
      return false
    }

    try {
      const tx = await contract.transferOwnership(newOwner)
      
      toast.loading('Transferring ownership...', { id: 'transfer' })
      await tx.wait()
      
      toast.success('Ownership transferred!', { id: 'transfer' })
      await fetchBankingData()
      return true
    } catch (error: any) {
      console.error('Transfer ownership error:', error)
      toast.error(error.reason || 'Transfer failed', { id: 'transfer' })
      return false
    }
  }, [contract, fetchBankingData])

  // Auto-fetch data when contract is ready
  useEffect(() => {
    if (contract && address) {
      fetchBankingData()
    }
  }, [contract, address, fetchBankingData])

  return {
    bankingData,
    loading,
    deposit,
    withdraw,
    getBalance,
    transferOwnership,
    fetchBankingData,
    isContractReady: !!contract,
  }
}
