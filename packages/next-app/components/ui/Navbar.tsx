// MUI
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
    return (
        <>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6' component='a' href='/'>
                        My App
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;
