import { useConnectedAccount, useVerification } from '@/context/AppContext';
import useVerifyUsers from '@/hooks/useVerifyUsers';
import { IDKitWidget, IErrorState, ISuccessResult } from '@worldcoin/idkit';
import { useState } from 'react';
import { useAccount } from 'wagmi';

export default function VerifyButton() {
    const { verifyMessage } = useVerification();
    const { connectedAccount } = useConnectedAccount();
    const [verificationSuccess, setVerificationSuccess] = useState(false);
    const account = useAccount();

    const { verifyUser } = useVerifyUsers();

    const handleVerify = (message: {
        merkle_root: string;
        nullifier_hash: string;
        proof: string;
        verification_level: string;
    }) => {
        // Assuming setVerifyMessage updates your context with message values
        console.log('Verification initiated with message:', message);
    };

    // Example of how handleSuccess might look in VerifyButton component
    const onVerify = async (successResult: ISuccessResult) => {
        console.log('Verification succeeded:', successResult);

        // const { proof, signal } = successResult;
        // const verification_level = VerificationLevel.Orb; // Set verification_level

        // // Ensure verification_level is passed along with proof and signal
        // fetch('/api/verify', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ proof, signal, verification_level }),
        // })
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error('Verification failed');
        //         }
        //         return response.json();
        //     })
        //     .then(data => {
        //         console.log('Verification API response:', data);
        //         // Handle API response as needed
        //     })
        //     .catch(error => {
        //         console.error('Error verifying proof:', error);
        //         // Handle error
        //     });
    };

    const handleSuccess = async (successResult: ISuccessResult) => {
        console.log('Handle Success:', successResult);

        await verifyUser(
            account.address!,
            successResult.merkle_root,
            successResult.nullifier_hash,
            successResult.proof as `0x${string}`
        );
    };

    const handleError = (error: IErrorState) => {
        console.error('Verification failed:', error);
        // Handle verification failure
    };

    return (
        <IDKitWidget
            app_id={process.env.NEXT_PUBLIC_WC_ACTION_APP_ID as `app_${string}`}
            action={process.env.NEXT_PUBLIC_WC_ACTION_NAME || ''}
            signal={account.address}
            onSuccess={handleSuccess}
            onError={handleError}
            // handleVerify={onVerify}
            // verification_level={VerificationLevel.Orb} // Adjust as per your requirements
        >
            {({ open }) => (
                <button className='verify-button px-3 py-1' onClick={open}>
                    Verify with World ID
                </button>
            )}
        </IDKitWidget>
    );
}
