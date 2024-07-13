import PoolCreationForm from '@/components/ui/PoolCreationForm';
import { Box } from '@mui/material';

const PoolCreationPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
            }}
        >
            <PoolCreationForm />
        </Box>
    );
};

export default PoolCreationPage;
