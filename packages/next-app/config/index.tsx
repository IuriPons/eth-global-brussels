import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

import { cookieStorage, createStorage } from 'wagmi';
import { Chain } from 'wagmi/chains';

export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

const metadata = {
    name: 'EthGlobal Brussels',
    description: 'AppKit Example',
    url: 'https://web3modal.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

export const chain: Chain = {
    id: 31337,
    name: 'Optimism Sepolia Anvil Fork',
    nativeCurrency: {
        decimals: 18,
        name: 'Optimism Sepolia Anvil Fork Ether',
        symbol: 'SETH',
    },
    rpcUrls: {
        default: { http: ['http://127.0.0.1:8545/'] },
    },
    testnet: true,
};

const chains = [chain] as const;
export const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
    storage: createStorage({
        storage: cookieStorage,
    }),
    // ...wagmiOptions // Optional - Override createConfig parameters
});
