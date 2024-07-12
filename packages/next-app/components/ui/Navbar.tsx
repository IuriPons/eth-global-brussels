// MUI
import ConnectButton from '@/app/components/connectbutton';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
    return (
        <>
            <AppBar position='static'>
                <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant='h6' component='a' href='/'>
                        My App
                    </Typography>

                    <ConnectButton />
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;
