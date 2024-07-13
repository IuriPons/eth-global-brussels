'use client';

import { SnackbarProvider as NotistackProvider } from 'notistack';

const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <NotistackProvider maxSnack={3} autoHideDuration={3000}>
            {children}
        </NotistackProvider>
    );
};

export default SnackbarProvider;
