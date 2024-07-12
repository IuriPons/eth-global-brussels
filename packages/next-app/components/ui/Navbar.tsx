'use client';

import ConnectButton from '@/components/ui/ConnectButton';
import VerifyButton from '@/components/ui/VerifyButton';
import { useConnectedAccount, useVerification } from '@/context/AppContext';
import { AppBar, Box, Button, Toolbar } from '@mui/material';

// Navigation Links
const navLinks = [
    { title: 'Swap', path: '/' },
    { title: 'Create Pool', path: '/create-pool' },
];

export default function Navbar() {
    const { verifyMessage } = useVerification();
    const { connectedAccount } = useConnectedAccount();

    return (
        <>
            <AppBar position='static'>
                <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ gap: 2 }}>
                        {/* <Typography variant='h6' component='a' href='/'>
                            My App
                        </Typography> */}
                        {navLinks.map(link => (
                            <Button key={link.title} color='inherit' component='a' href={link.path}>
                                {link.title}
                            </Button>
                        ))}
                    </Box>

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
