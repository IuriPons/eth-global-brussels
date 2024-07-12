'use client'; // for Next.js app router
import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit';
import { useVerification } from '@/context/AppContext';

export default function VerifyButton() {
    const { verifyMessage, setVerifyMessage } = useVerification();
    const handleVerify = (message: {
        merkle_root: string;
        nullifier_hash: string;
        proof: string;
        verification_level: string;
    }) => {
        setVerifyMessage(message);
        console.log(`message: ${message}`);
        console.log(`State verifyMessage: ${verifyMessage}`);
    };

    return (
        <IDKitWidget
            app_id={`app_staging_${process.env.NEXT_PUBLIC_WC_ACTION_APP_ID}`}
            action={process.env.NEXT_PUBLIC_WC_ACTION_NAME || ''}
            onSuccess={message => console.log(message)}
            handleVerify={handleVerify}
            verification_level={VerificationLevel.Orb} //VerificationLevel.Device?
        >
            {({ open }) => (
                <button className='verify-button px-3 py-1' onClick={open}>
                    Verify with World ID
                </button>
            )}
        </IDKitWidget>
    );
}
