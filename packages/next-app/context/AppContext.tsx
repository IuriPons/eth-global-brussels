// app/context/AppContext.tsx
'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
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
    success: boolean;
    setSuccess: Dispatch<SetStateAction<boolean>>;
}

// Creating Verification Context
const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

// Provider Component for Verification Context
const VerificationProvider = ({ children }: { children: ReactNode }) => {
    const [verifyMessage, setVerifyMessage] = useState<VerificationMessage | null>(null);
    const [success, setSuccess] = useState(false);

    return (
        <VerificationContext.Provider value={{ verifyMessage, setVerifyMessage, success, setSuccess }}>
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

// Interface for CreateHook
interface CreateHook {
    pairToken1: string | null;
    pairToken2: string | null;
    fee: number;
    hookName: string;
    hookAddress: string;
    volumeLimit: string;
}

// Interface for Connected Account
interface ConnectedAccount {
    address: string | null;
    status: 'connected' | 'disconnected' | 'connecting';
}

// Connected Account Context Types
interface ConnectedAccountContextType {
    connectedAccount: ConnectedAccount;
    setConnectedAccount: Dispatch<SetStateAction<ConnectedAccount>>;
    createHook: CreateHook;
    setCreateHook: Dispatch<SetStateAction<CreateHook>>;
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
    const [createHook, setCreateHook] = useState<CreateHook>({
        pairToken1: null,
        pairToken2: null,
        fee: 0,
        hookName: '',
        hookAddress: '',
        volumeLimit: '',
    });

    // Update the connected account state when address or status changes
    useEffect(() => {
        setConnectedAccount({ address, status });
    }, [address, status]);

    return (
        <ConnectedAccountContext.Provider value={{ connectedAccount, setConnectedAccount, createHook, setCreateHook }}>
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

export { AppProvider, useConnectedAccount, useVerification };
