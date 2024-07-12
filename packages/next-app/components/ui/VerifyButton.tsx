'use client'; // for Next.js app router
import { useVerification } from '@/context/AppContext';
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit';

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
                <button className='bg-green-500 text-white px-3 py-1 rounded' onClick={open}>
                    Verify with World ID
                </button>
            )}
        </IDKitWidget>
    );
}
