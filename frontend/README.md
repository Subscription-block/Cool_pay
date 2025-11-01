# Cool Bank Frontend

A modern React frontend for the Cool Bank digital banking application, built with TypeScript, Vite, and WalletConnect integration.

## 🚀 Features

- **🔗 WalletConnect Integration**: Seamless wallet connection using Reown AppKit
- **💰 Banking Operations**: Deposit and withdraw ETH with real-time balance updates
- **📱 Responsive Design**: Modern, mobile-first UI with Tailwind CSS
- **⚡ Fast Development**: Vite for lightning-fast builds and hot reload
- **🔒 Type Safety**: Full TypeScript integration with smart contract types
- **🎨 Modern UI**: Beautiful animations with Framer Motion
- **📊 Real-time Data**: Live balance tracking and transaction status
- **🌐 Multi-Network**: Support for Hardhat, Sepolia, and Mainnet

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Reown AppKit** - WalletConnect v2 integration
- **Ethers.js v6** - Ethereum interaction library
- **React Hot Toast** - Beautiful notifications

## 📦 Installation

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```bash
   VITE_REOWN_PROJECT_ID=982f175981feaa4270a11ee31a1231d6
   VITE_CONTRACT_ADDRESS_HARDHAT=0x5FbDB2315678afecb367f032d93F642f64180aa3
   # Add other contract addresses after deployment
   ```

## 🚀 Development

### Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

### Type Checking

```bash
npm run type-check
```

## 🏗️ Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── Header.tsx     # App header with wallet connection
│   │   ├── WelcomeScreen.tsx  # Landing page for non-connected users
│   │   ├── Dashboard.tsx  # Main banking dashboard
│   │   ├── BalanceCard.tsx    # Balance display component
│   │   └── TransactionForm.tsx # Deposit/withdraw forms
│   ├── config/           # Configuration files
│   │   ├── walletConnect.ts   # WalletConnect setup
│   │   └── contracts.ts   # Smart contract ABI and addresses
│   ├── hooks/            # Custom React hooks
│   │   └── useCoolBank.ts # Smart contract interaction hook
│   ├── utils/            # Utility functions
│   │   └── cn.ts         # Class name utility
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # App entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🔧 Configuration

### WalletConnect Setup

The app uses Reown AppKit (WalletConnect v2) for wallet connections. The configuration is in `src/config/walletConnect.ts`:

- **Project ID**: `982f175981feaa4270a11ee31a1231d6`
- **Supported Networks**: Hardhat Local, Sepolia Testnet, Ethereum Mainnet
- **Default Network**: Sepolia Testnet

### Smart Contract Integration

Contract configuration is in `src/config/contracts.ts`:

- **ABI**: Complete CoolBank contract ABI
- **Addresses**: Network-specific contract addresses
- **Type Safety**: Full TypeScript support for contract methods

### Styling

The app uses Tailwind CSS with a custom design system:

- **Primary Colors**: Blue gradient theme
- **Success Colors**: Green for deposits
- **Warning Colors**: Orange for withdrawals
- **Custom Components**: Reusable button and card styles
- **Animations**: Smooth transitions with Framer Motion

## 🎯 Usage

### Connecting a Wallet

1. Click the "Connect Wallet" button in the header
2. Select your preferred wallet from the modal
3. Approve the connection in your wallet

### Making Deposits

1. Enter the amount of ETH to deposit
2. Click "Deposit" button
3. Confirm the transaction in your wallet
4. Wait for confirmation and balance update

### Making Withdrawals

1. Enter the amount to withdraw (up to your balance)
2. Click "Withdraw" button
3. Confirm the transaction in your wallet
4. Wait for confirmation and balance update

### Viewing Balances

The dashboard shows three key balances:
- **My Balance**: Your personal Cool Bank balance
- **Total Deposits**: Total ETH in the Cool Bank system
- **Contract Balance**: Total ETH held by the smart contract

## 🔒 Security Features

- **Read-only Contract Calls**: Balance queries don't require gas
- **Transaction Validation**: Input validation before sending transactions
- **Error Handling**: Comprehensive error messages and recovery
- **Network Detection**: Automatic network switching support
- **Wallet Security**: No private key handling in the frontend

## 🌐 Network Support

| Network | Chain ID | Status | Contract Address |
|---------|----------|--------|------------------|
| Hardhat Local | 31337 | ✅ Ready | `0x5FbDB...` |
| Sepolia Testnet | 11155111 | ✅ Ready | Update after deployment |
| Ethereum Mainnet | 1 | ✅ Ready | Update after deployment |

## 🚨 Troubleshooting

### Common Issues

1. **Wallet Connection Failed**
   - Ensure your wallet extension is installed and unlocked
   - Try refreshing the page and reconnecting

2. **Contract Not Found**
   - Verify you're on the correct network
   - Check that the contract is deployed on the current network

3. **Transaction Failed**
   - Ensure you have sufficient ETH for gas fees
   - Check that you have enough balance for withdrawals

4. **Slow Loading**
   - Check your internet connection
   - Try switching to a different RPC provider

### Development Issues

1. **Build Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check TypeScript errors with `npm run type-check`

2. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check for conflicting CSS classes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run linting and type checking
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Cool Bank Frontend** - Built with ❤️ for the future of digital banking
