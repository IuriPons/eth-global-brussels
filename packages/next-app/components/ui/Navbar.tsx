'use client';

import ConnectButton from '@/components/ui/ConnectButton';
import VerifyButton from '@/components/ui/VerifyButton';
import { useConnectedAccount, useVerification } from '@/context/AppContext';
import { AppBar, Toolbar } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const { verifyMessage } = useVerification();
    const { connectedAccount } = useConnectedAccount();
    const pathname = usePathname();

    const getNavButtonClass = path => {
        return pathname === path ? 'nav-button' : 'nav-button-inactive';
    };

    return (
        <>
            <AppBar position='static' sx={{ backgroundColor: '#FFFFFF', boxShadow: 'none', padding: '10px' }}>
                <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className='flex items-center space-x-20'>
                        <Link href='/' className='logo'>
                            <Image src='/applogo.png' alt='App Logo' width={100} height={100} />
                        </Link>
                        <Link href='/swap' passHref>
                            <button className={getNavButtonClass('/swap')}>Trade</button>
                        </Link>
                        <Link href='/create' passHref>
                            <button className={getNavButtonClass('/create')}>Pool</button>
                        </Link>
                        <Link href='/pools' passHref>
                            <button className={getNavButtonClass('/pools')}>Discover</button>
                        </Link>
                    </div>
                    <div className='flex items-center space-x-4'>
                        <Image
                            alt='eth'
                            className='eth-logo'
                            width={24}
                            height={24}
                            style={{ borderRadius: '6px', marginRight: '2px' }}
                            src='/eth.png'
                        />
                        {/* <img alt="eth" className="eth-logo" src="/eth.png" /> */}
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
