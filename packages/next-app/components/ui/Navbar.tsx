// MUI
import ConnectButton from '@/app/components/connectbutton';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
    return (
        <>
            <AppBar position='static'>
                <Toolbar>
                    <Typography
                        variant='h6'
                        component='a'
                        href='/'
                        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}
                    >
                        My App
                        <ConnectButton />
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;
