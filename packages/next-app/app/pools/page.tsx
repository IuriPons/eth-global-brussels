'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import LiquidityPage from '@/components/layout/LiquidityPage';

// Define the data type
interface PairData {
    pair: string;
    hook: string;
    apr: number;
}

// Sample data array
const data: PairData[] = [
    { pair: 'WBTC / ETH', hook: 'Hook 1', apr: 8.213 },
    { pair: 'USDC / ETH', hook: 'Hook 2', apr: 9.047 },
];

const PoolsPage: React.FC = () => {
    const [selectedPair, setSelectedPair] = useState<{ pairToken1: string; pairToken2: string } | null>(null);

    const handleAddLiquidity = (pair: string) => {
        const [pairToken1, pairToken2] = pair.split(' / ');
        setSelectedPair({ pairToken1, pairToken2 });
    };

    const handleCloseModal = () => {
        setSelectedPair(null);
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
                                <th>Hook</th>
                                <th>APR</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <td className='pair'>{row.pair}</td>
                                    <td>{row.hook}</td>
                                    <td>{row.apr.toFixed(3)}%</td>
                                    <td>
                                        <button onClick={() => handleAddLiquidity(row.pair)}>Add Liquidity</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Box>

            {selectedPair && (
                <LiquidityPage
                    open={Boolean(selectedPair)}
                    onClose={handleCloseModal}
                    pairToken1={selectedPair.pairToken1}
                    pairToken2={selectedPair.pairToken2}
                />
            )}
        </div>
    );
};

export default PoolsPage;
