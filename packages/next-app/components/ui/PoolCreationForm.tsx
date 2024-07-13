'use client';

import { useState } from 'react';

// MUI
import { Box, Button, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';

// Hooks
import usePoolFactory from '@/hooks/usePoolFactory';

// Types
import { PoolCreationInfo } from '@/types';

// Constants
import { COINS } from '@/constants';

const PoolCreationForm = () => {
    // Pool Factory Hook
    const { createPool } = usePoolFactory();

    // States
    const [poolCreationInfo, setPoolCreationInfo] = useState<PoolCreationInfo>({
        coin1: COINS[0],
        coin2: COINS[1],
        fee: 300,
        hook: '',
    });

    const { coin1, coin2, fee, hook } = poolCreationInfo;

    const handleCoin1Change = (e: SelectChangeEvent) => {
        const newCoin1 = COINS.find(coin => coin.symbol === e.target.value);

        if (newCoin1) {
            let newCoin2 = coin2;

            if (newCoin1.symbol === coin2.symbol) {
                newCoin2 = coin1;
            }

            setPoolCreationInfo({
                ...poolCreationInfo,
                coin1: newCoin1,
                coin2: newCoin2,
            });
        }
    };

    const handleCoin2Change = (e: SelectChangeEvent) => {
        const newCoin2 = COINS.find(coin => coin.symbol === e.target.value);

        if (newCoin2) {
            let newCoin1 = coin1;

            if (newCoin2.symbol === coin1.symbol) {
                newCoin1 = coin2;
            }

            setPoolCreationInfo({
                ...poolCreationInfo,
                coin1: newCoin1,
                coin2: newCoin2,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await createPool(
            '0x0000000000000000000000000000000000000000',
            '0x0000000000000000000000000000000000000001',
            300
        );
    };

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
                onChange={e =>
                    setPoolCreationInfo({
                        ...poolCreationInfo,
                        fee: +e.target.value,
                    })
                }
            />

            <TextField
                label='Hook'
                value={hook}
                onChange={e =>
                    setPoolCreationInfo({
                        ...poolCreationInfo,
                        hook: e.target.value,
                    })
                }
                sx={{ width: 500 }}
            />

            <Button variant='outlined' type='submit'>
                Create Pool
            </Button>
        </Box>
    );
};

export default PoolCreationForm;
