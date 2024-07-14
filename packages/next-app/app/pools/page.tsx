'use client';

import { useState } from 'react';

// MUI
import { Box } from '@mui/material';

// Components
import LiquidityPage from '@/components/layout/LiquidityPage';

// Hooks
import usePools from '@/hooks/usePools';

// Types
import { Pool } from '@/types';

const PoolsPage = () => {
    // Pools Hook
    const { pools, error, isLoading } = usePools();

    // States
    const [selectedPool, setSelectedPool] = useState<Pool | null>(null);

    const handleAddLiquidity = (pool: Pool) => {
        setSelectedPool(pool);
    };

    const handleCloseModal = () => {
        setSelectedPool(null);
    };

    return (
        <div className='row flex'>
            <Box
                sx={{
                    height: '95vh',
                    padding: '8% 12% 12% 12%',
                    margin: 'auto',
                }}
            >
                <div>
                    <table className='pair-table'>
                        <thead>
                            <tr>
                                <th>Pair</th>
                                <th>Fee</th>
                                <th>Hook</th>
                                <th>Liquidity</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {pools.map((pool, index) => (
                                <tr key={index}>
                                    <td className='pair'>
                                        {pool.currency0?.symbol} / {pool.currency1?.symbol}
                                    </td>
                                    <td>{pool.fee}</td>
                                    <td>{pool.hook?.name}</td>
                                    <td>10 M / 10 M</td>
                                    <td>
                                        <button onClick={() => handleAddLiquidity(pool)}>Add Liquidity</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Box>

            {selectedPool && (
                <LiquidityPage open={Boolean(selectedPool)} onClose={handleCloseModal} pool={selectedPool} />
            )}
        </div>
    );
};

export default PoolsPage;
