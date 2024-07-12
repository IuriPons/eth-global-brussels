'use client';

import { useState } from 'react';

// MUI
import { Box, Button, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';

// Types
import { PoolCreationInfo } from '@/types';

// Constants
import { COINS } from '@/constants';

const PoolCreationForm = () => {
    const [poolCreationInfo, setPoolCreationInfo] = useState<PoolCreationInfo>({
        coin1: COINS[0],
        coin2: COINS[1],
        fee: 300,
        hook: '',
    });
    const [error, setError] = useState({ error: false, message: '' });

    const { coin1, coin2, fee, hook } = poolCreationInfo;

    const handleCoin1Change = (e: SelectChangeEvent) => {
        const coin = COINS.find(coin => coin.symbol === e.target.value);

        if (coin) {
            setPoolCreationInfo({ ...poolCreationInfo, coin1: coin });
        }
    };

    const handleCoin2Change = (e: SelectChangeEvent) => {
        const coin = COINS.find(coin => coin.symbol === e.target.value);

        if (coin) {
            setPoolCreationInfo({ ...poolCreationInfo, coin2: coin });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {};

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
            autoComplete='off'
            maxWidth={500}
            sx={{ display: 'flex', flexFlow: 'column', gap: 2 }}
        >
            <Select value={coin1.symbol} label='Cryptocurrency 1' onChange={handleCoin1Change}>
                {COINS.map(coin => (
                    <MenuItem key={coin.symbol} value={coin.symbol}>
                        {coin.name}
                    </MenuItem>
                ))}
            </Select>

            <Select value={coin2.symbol} label='Cryptocurrency 2' onChange={handleCoin2Change}>
                {COINS.map(coin => (
                    <MenuItem key={coin.symbol} value={coin.symbol}>
                        {coin.name}
                    </MenuItem>
                ))}
            </Select>

            <TextField
                type='number'
                label='Fee'
                value={fee}
                onChange={e => setPoolCreationInfo({ ...poolCreationInfo, fee: +e.target.value })}
            />

            <TextField
                label='Hook'
                value={hook}
                onChange={e => setPoolCreationInfo({ ...poolCreationInfo, hook: e.target.value })}
                sx={{ width: 500 }}
            />

            <Button variant='outlined' type='submit'>
                Create Pool
            </Button>
        </Box>
    );
};

export default PoolCreationForm;
