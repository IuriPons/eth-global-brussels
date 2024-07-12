// app/context/AppContext.tsx
'use client';

import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';
import { useAccount } from 'wagmi';

// Interface for Verification Message
interface VerificationMessage {
    merkle_root: string;
    nullifier_hash: string;
    proof: string;
    verification_level: string;
}

// Verification Context Types
interface VerificationContextType {
    verifyMessage: VerificationMessage | null;
    setVerifyMessage: Dispatch<SetStateAction<VerificationMessage | null>>;
}

// Creating Verification Context
const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

// Provider Component for Verification Context
const VerificationProvider = ({ children }: { children: ReactNode }) => {
    const [verifyMessage, setVerifyMessage] = useState<VerificationMessage | null>(null);

    return (
        <VerificationContext.Provider value={{ verifyMessage, setVerifyMessage }}>
            {children}
        </VerificationContext.Provider>
    );
};

// Custom Hook for Verification Context
const useVerification = (): VerificationContextType => {
    const context = useContext(VerificationContext);
    if (!context) {
        throw new Error('useVerification must be used within a VerificationProvider');
    }
    return context;
};

// Interface for Connected Account
interface ConnectedAccount {
    address: string | null;
    status: 'connected' | 'disconnected' | 'connecting';
}

// Connected Account Context Types
interface ConnectedAccountContextType {
    connectedAccount: ConnectedAccount;
    setConnectedAccount: Dispatch<SetStateAction<ConnectedAccount>>;
}

// Creating Connected Account Context
const ConnectedAccountContext = createContext<ConnectedAccountContextType | undefined>(undefined);

// Provider Component for Connected Account Context
const ConnectedAccountProvider = ({ children }: { children: ReactNode }) => {
    const { address, status } = useAccount();
    const [connectedAccount, setConnectedAccount] = useState<ConnectedAccount>({
        address: null,
        status: 'disconnected',
    });

    // Update the connected account state when address or status changes
    React.useEffect(() => {
        setConnectedAccount({ address, status });
    }, [address, status]);

    return (
        <ConnectedAccountContext.Provider value={{ connectedAccount, setConnectedAccount }}>
            {children}
        </ConnectedAccountContext.Provider>
    );
};

// Custom Hook for Connected Account Context
const useConnectedAccount = (): ConnectedAccountContextType => {
    const context = useContext(ConnectedAccountContext);
    if (!context) {
        throw new Error('useConnectedAccount must be used within a ConnectedAccountProvider');
    }
    return context;
};

// Combine All Providers in a Single Component
const AppProvider = ({ children }: { children: ReactNode }) => {
    return (
        <VerificationProvider>
            <ConnectedAccountProvider>{children}</ConnectedAccountProvider>
        </VerificationProvider>
    );
};

export { AppProvider, useVerification, useConnectedAccount };
