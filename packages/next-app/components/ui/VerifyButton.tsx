import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit';
import { useConnectedAccount, useVerification } from '@/context/AppContext';
import { useState } from 'react';

export default function VerifyButton() {
    const { verifyMessage } = useVerification();
    const { connectedAccount } = useConnectedAccount();
    const [verificationSuccess, setVerificationSuccess] = useState(false);

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
    const onVerify = successResult => {
        console.log('Verification succeeded:', successResult);

        const { proof, signal } = successResult;
        const verification_level = VerificationLevel.Orb; // Set verification_level

        // Ensure verification_level is passed along with proof and signal
        fetch('/api/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ proof, signal, verification_level }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Verification failed');
                }
                return response.json();
            })
            .then(data => {
                console.log('Verification API response:', data);
                // Handle API response as needed
            })
            .catch(error => {
                console.error('Error verifying proof:', error);
                // Handle error
            });
    };

    const handleError = error => {
        console.error('Verification failed:', error);
        // Handle verification failure
    };

    return (
        <IDKitWidget
            app_id={`app_staging_${process.env.NEXT_PUBLIC_WC_ACTION_APP_ID}`}
            action={process.env.NEXT_PUBLIC_WC_ACTION_NAME || ''}
            signal={connectedAccount.address || ''}
            onSuccess={() => console.log('onsuccess')}
            onError={handleError}
            handleVerify={onVerify}
            verification_level={VerificationLevel.Orb} // Adjust as per your requirements
        >
            {({ open }) => (
                <button className='verify-button px-3 py-1' onClick={open}>
                    Verify with World ID
                </button>
            )}
        </IDKitWidget>
    );
}
