'use client'; // for Next.js app router
import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit';

export default function VerifyButton() {
    return (
        <IDKitWidget
            app_id={`app_staging_${process.env.NEXT_PUBLIC_WC_ACTION_APP_ID}`}
            action={process.env.NEXT_PUBLIC_WC_ACTION_NAME || ''}
            onSuccess={message => console.log(message)}
            handleVerify={message => console.log(message)} // callback when the proof is received
            verification_level={VerificationLevel.Orb} //VerificationLevel.Device?
        >
            {({ open }) => <button onClick={open}>Verify with World ID</button>}
        </IDKitWidget>
    );
}
