'use client';

import ConnectButton from '@/app/components/connectbutton';
import VerifyButton from '@/app/components/verifybutton';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useVerification, useConnectedAccount } from '@/context/AppContext';

export default function Navbar() {
    const { verifyMessage } = useVerification();
    const { connectedAccount } = useConnectedAccount();

    return (
        <>
            <AppBar position='static'>
                <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant='h6' component='a' href='/'>
                        My App
                    </Typography>
                    <div className="flex items-center space-x-4">
                        <ConnectButton />
                        {connectedAccount.status === 'connected' && (
                            <>
                                {verifyMessage && verifyMessage.proof !== '' ? (
                                    <button className="bg-green-500 text-white px-3 py-1 rounded">
                                        Verified
                                    </button>
                                ) : (
                                    <VerifyButton />
                                )}
                            </>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
}
