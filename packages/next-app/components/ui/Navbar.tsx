'use client';

import ConnectButton from '@/app/components/connectbutton';
import VerifyButton from '@/app/components/verifybutton';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useVerification, useConnectedAccount } from '@/context/AppContext';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
    const { verifyMessage } = useVerification();
    const { connectedAccount } = useConnectedAccount();

    return (
        <>
            <AppBar position='static'>
                <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="flex items-center space-x-4">
                        <Link href="/" passHref>
                            <Image src="/applogo.gif" alt="App Logo" width={200} height={100} />
                        </Link>
                        <Link href="/create" passHref>
                            <button>CREATE</button>
                        </Link>
                        <Link href="/pools" passHref>
                            <button>POOLS</button>
                        </Link>
                        <Link href="/swipe" passHref>
                            <button>SWIPE</button>
                        </Link>
                    </div>
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
