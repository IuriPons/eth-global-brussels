'use client';

import ConnectButton from '@/components/ui/ConnectButton';
import VerifyButton from '@/components/ui/VerifyButton';
import { useConnectedAccount, useVerification } from '@/context/AppContext';
import { AppBar, Toolbar } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
    const { verifyMessage } = useVerification();
    const { connectedAccount } = useConnectedAccount();

    return (
        <>
            <AppBar position='static' sx={{ backgroundColor: '#510CA7' }}>
                <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className='flex items-center space-x-4'>
                        <Link href='/' passHref>
                            App Logo
                            {/* <Image src='' alt='App Logo' width={200} height={100} /> */}
                        </Link>
                        <Link href='/create' passHref>
                            <button>CREATE</button>
                        </Link>
                        <Link href='/pools' passHref>
                            <button>POOLS</button>
                        </Link>
                        <Link href='/swap' passHref>
                            <button>SWAP</button>
                        </Link>
                    </div>
                    <div className='flex items-center space-x-4'>
                        <ConnectButton />
                        {connectedAccount.status === 'connected' && (
                            <>
                                {verifyMessage && verifyMessage.proof !== '' ? (
                                    <button className='bg-green-500 text-white px-3 py-1 rounded'>Verified</button>
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
