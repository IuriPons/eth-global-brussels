// MUI
import { Box } from '@mui/material';

// Components
import PoolCreationForm from '@/components/ui/PoolCreationForm';

const PoolCreation = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <PoolCreationForm />
        </Box>
    );
};

export default PoolCreation;
