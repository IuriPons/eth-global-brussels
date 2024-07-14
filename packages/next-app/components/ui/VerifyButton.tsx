import { useVerification } from '@/context/AppContext';
import useVerifyUsers from '@/hooks/useVerifyUsers';
import { IDKitWidget, IErrorState, ISuccessResult } from '@worldcoin/idkit';
import { useAccount } from 'wagmi';

export default function VerifyButton() {
    const { setSuccess } = useVerification();
    const account = useAccount();

    const { verifyUser } = useVerifyUsers();

    const handleSuccess = async (successResult: ISuccessResult) => {
        console.log('Handle Success:', successResult);

        await verifyUser(
            account.address!,
            successResult.merkle_root,
            successResult.nullifier_hash,
            successResult.proof as `0x${string}`
        );

        setSuccess(true);
    };

    const handleError = (error: IErrorState) => {
        console.error('Verification failed:', error);
    };

    return (
        <IDKitWidget
            app_id={process.env.NEXT_PUBLIC_WC_ACTION_APP_ID as `app_${string}`}
            action={process.env.NEXT_PUBLIC_WC_ACTION_NAME || ''}
            signal={account.address}
            onSuccess={handleSuccess}
            onError={handleError}
        >
            {({ open }) => (
                <button className='verify-button' onClick={open}>
                    <img src='/worldcoinlogo.gif' alt='Worldcoin Logo' className='wc-logo' />
                    Verify with Worldcoin
                </button>
            )}
        </IDKitWidget>
    );
}
