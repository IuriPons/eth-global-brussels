'use client';

import React, { ReactNode } from 'react';
import { config, projectId } from '@/config';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { State, WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();

if (!projectId) throw new Error('Project ID is not defined');

createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    enableOnramp: true, // Optional - false as default
    themeVariables: {
        '--w3m-font-family': 'Kanit, sans-serif',
        '--w3m-accent': '#174078',
        // '--w3m-accent': '#82F27E', // Button background color
        '--w3m-border-radius-master': '10px',
    },
});

export default function Web3ModalProvider({ children, initialState }: { children: ReactNode; initialState?: State }) {
    return (
        <WagmiProvider config={config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    );
}
