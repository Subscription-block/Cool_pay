# CoolBank - Hardhat TypeScript Project

A modern Hardhat project with TypeScript support for developing, testing, and deploying smart contracts on Ethereum.

## Features

- **TypeScript Support**: Full TypeScript integration for type-safe development
- **Comprehensive Testing**: Complete test suite with Chai assertions
- **Multiple Networks**: Pre-configured for local, testnet, and mainnet deployment
- **Gas Reporting**: Built-in gas usage analysis
- **Contract Verification**: Etherscan integration for contract verification
- **Type Generation**: Automatic TypeScript type generation for contracts

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd cool_bank
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your configuration:
   ```bash
   SEPOLIA_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
   MAINNET_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
   PRIVATE_KEY=your_private_key_here
   ETHERSCAN_API_KEY=your_etherscan_api_key_here
   REPORT_GAS=true
   ```

## Usage

### Compile Contracts

```bash
npm run build
```

### Run Tests

```bash
npm test
```

### Deploy to Local Network

1. Start a local Hardhat node:
   ```bash
   npm run node
   ```

2. Deploy to the local network:
   ```bash
   npm run deploy:localhost
   ```

### Deploy to Sepolia Testnet

```bash
npm run deploy:sepolia
```

### Other Commands

- **Clean artifacts**: `npm run clean`
- **Generate TypeChain types**: `npm run typechain`
- **Run coverage**: `npm run coverage`

## Project Structure

```
cool_bank/
├── contracts/          # Solidity smart contracts
│   └── CoolBank.sol   # Main bank contract
├── scripts/           # Deployment scripts
│   └── deploy.ts      # Deployment script
├── test/              # Test files
│   └── CoolBank.test.ts # Contract tests
├── typechain-types/   # Generated TypeScript types (auto-generated)
├── hardhat.config.ts  # Hardhat configuration
├── tsconfig.json      # TypeScript configuration
├── package.json       # Project dependencies and scripts
└── README.md          # This file
```

## Smart Contract: CoolBank

The `CoolBank` contract is a simple banking system that allows users to:

- **Deposit ETH**: Users can deposit Ether into their account
- **Withdraw ETH**: Users can withdraw their deposited Ether
- **Check Balances**: View account balances
- **Transfer Ownership**: Contract owner can transfer ownership

### Contract Functions

- `deposit()`: Deposit ETH into your account
- `withdraw(uint256 amount)`: Withdraw a specific amount
- `getBalance(address user)`: Get balance of any user
- `getMyBalance()`: Get your own balance
- `transferOwnership(address newOwner)`: Transfer contract ownership (owner only)
- `getContractBalance()`: Get total contract balance

## Testing

The project includes comprehensive tests covering:

- Contract deployment
- Deposit functionality
- Withdrawal functionality
- Balance queries
- Ownership management
- Edge cases and error conditions

Run tests with:
```bash
npm test
```

## Network Configuration

The project is pre-configured for:

- **Hardhat Network**: Local development (chainId: 31337)
- **Localhost**: Local node (http://127.0.0.1:8545)
- **Sepolia**: Ethereum testnet (chainId: 11155111)
- **Mainnet**: Ethereum mainnet (chainId: 1)

## Security Considerations

- Always use a separate wallet for development and testing
- Never commit private keys to version control
- Test thoroughly on testnets before mainnet deployment
- Consider getting contracts audited for production use

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [OpenZeppelin Contracts](https://openzeppelin.com/contracts/)
# Cool_pay
