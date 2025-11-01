import { createAppKit } from '@reown/appkit'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'

// Your Reown Project ID
const projectId = '982f175981feaa4270a11ee31a1231d6'

// Create the networks configuration
const networks = [
  {
    id: 1,
    name: 'Ethereum',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: {
        http: ['https://eth.llamarpc.com'],
      },
      public: {
        http: ['https://eth.llamarpc.com'],
      },
    },
    blockExplorers: {
      default: { name: 'Etherscan', url: 'https://etherscan.io' },
    },
  },
  {
    id: 11155111,
    name: 'Sepolia',
    nativeCurrency: {
      decimals: 18,
      name: 'Sepolia Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: {
        http: ['https://rpc.sepolia.org'],
      },
      public: {
        http: ['https://rpc.sepolia.org'],
      },
    },
    blockExplorers: {
      default: { name: 'Etherscan', url: 'https://sepolia.etherscan.io' },
    },
    testnet: true,
  },
  {
    id: 31337,
    name: 'Hardhat',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: {
        http: ['http://127.0.0.1:8545'],
      },
      public: {
        http: ['http://127.0.0.1:8545'],
      },
    },
    blockExplorers: {
      default: { name: 'Local', url: 'http://localhost:8545' },
    },
    testnet: true,
  },
]

// Set up the Ethers adapter
const ethersAdapter = new EthersAdapter()

// Create the AppKit instance
export const appKit = createAppKit({
  adapters: [ethersAdapter],
  projectId,
  networks,
  defaultNetwork: networks[1], // Sepolia
  metadata: {
    name: 'Cool Bank',
    description: 'Digital Banking Transfer Application',
    url: 'https://coolbank.app',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  },
  features: {
    analytics: true,
    email: false,
    socials: false,
  }
})

// Export the ethers adapter for use in components
export { ethersAdapter }
