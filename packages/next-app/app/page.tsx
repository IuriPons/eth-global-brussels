'use client'; // for Next.js app router
import VerifyButton from './components/verifybutton';
import { useVerification, useConnectedAccount } from '@/context/AppContext';

export default function Home() {
    const { verifyMessage } = useVerification();
    const { connectedAccount } = useConnectedAccount();

    return (
        <div>
            {verifyMessage ? (
                <div>
                    <p>Merkle Root: {verifyMessage.merkle_root}</p>
                    <p>Nullifier Hash: {verifyMessage.nullifier_hash}</p>
                    <p>Proof: {verifyMessage.proof}</p>
                    <p>Verification Level: {verifyMessage.verification_level}</p>
                </div>
            ) : (
                <p>No verification message received yet.</p>
            )}

            {connectedAccount.address ? (
                <div>
                    <p>Address: {connectedAccount.address}</p>
                    <p>Status: {connectedAccount.status}</p>
                </div>
            ) : (
                <p>No connected account.</p>
            )}
        </div>
    );
}
