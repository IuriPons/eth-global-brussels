// MUI
import { Box } from '@mui/material';

// Components
import PoolCreationForm from '@/components/ui/PoolCreationForm';

const CreatePool = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <PoolCreationForm />
        </Box>
    );
};

export default CreatePool;
