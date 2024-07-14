'use client';

import { Box, Modal } from '@mui/material';
import Image from 'next/image';

// Hooks
import usePoolFactory from '@/hooks/usePoolFactory';

// Types
import { AddLiquidtyInfo, Pool } from '@/types';
import { useState } from 'react';

// Props
interface Props {
    open: boolean;
    onClose: () => void;
    pool: Pool;
}

const LiquidityPage = ({ open, onClose, pool }: Props) => {
    // Pool Factory Hook
    const { approveLiquidity, addLiquidity } = usePoolFactory();

    // States
    const [addLiquidityInfo, setAddLiquidityInfo] = useState<AddLiquidtyInfo>({
        token0: pool.currency0,
        token1: pool.currency1,
        amount0: 0,
        amount1: 0,
    });

    const { token0, token1, amount0, amount1 } = addLiquidityInfo;

    const handleAmount0Changed = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setAddLiquidityInfo({ ...addLiquidityInfo, amount0: value, amount1: value });
    };

    const handleAmount1Changed = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setAddLiquidityInfo({ ...addLiquidityInfo, amount1: value, amount0: value });
    };

    const handleCreatePool = async () => {
        if (!token0 || !token1) {
            return;
        }

        await approveLiquidity(token0.address as `0x${string}`, amount0);
        await approveLiquidity(token1.address as `0x${string}`, amount1);
        await addLiquidity(
            token0.address as `0x${string}`,
            token1.address as `0x${string}`,
            pool.fee,
            amount0,
            amount1
        );
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'fixed',
                    top: '40px',
                    left: '100px',
                    right: '100px',
                    bottom: '40px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    overflowY: 'auto',
                    borderRadius: '20px',
                    padding: '40px 80px',
                }}
            >
                <div className='row flex items-center'>
                    <h2 className='create-title m-auto'>ADD LIQUIDITY</h2>
                </div>
                <div className='row flex items-center'>
                    <p className='create-label w-40'>Currencies</p>
                    <div className='create-div-slanted p-2 my-2 relative ml-20'>
                        <button className='create-select-button absolute right-2 top-2 bottom-2 px-2 my-2 flex items-center justify-center'>
                            <div className='flex items-center space-x-2 create-selected-token-div'>
                                {token0 && (
                                    <>
                                        <Image
                                            src={token0.icon}
                                            alt={token0.name}
                                            width={50}
                                            height={50}
                                            className='rounded-full'
                                        />
                                        <p>{token0.symbol}</p>
                                    </>
                                )}
                            </div>
                        </button>
                    </div>
                    <div className='create-div-slanted p-2 my-2 relative ml-20'>
                        <button className='create-select-button absolute right-2 top-2 bottom-2 px-2 my-2 flex items-center justify-center'>
                            <div className='flex items-center space-x-2 create-selected-token-div'>
                                {token1 && (
                                    <>
                                        <Image
                                            src={token1.icon}
                                            alt={token1.name}
                                            width={50}
                                            height={50}
                                            className='rounded-full'
                                        />
                                        <p>{token1.symbol}</p>
                                    </>
                                )}
                            </div>
                        </button>
                    </div>
                </div>
                <div className='row flex items-center'>
                    <p className='create-label w-40'>Amounts</p>
                    <div className='create-div-slanted-light p-2 my-2 relative ml-20'>
                        <input
                            type='text'
                            className='create-input-slanted bg-transparent w-full pr-20 h-16 text-lg'
                            placeholder=''
                            value={amount0}
                            onChange={handleAmount0Changed}
                        />
                        {token0 && <p className='create-button-text'>{token0.symbol}</p>}
                    </div>
                </div>
                <div className='row flex items-center'>
                    <p className='create-label w-40'></p>
                    <div className='create-div-slanted-light p-2 my-2 relative ml-20'>
                        <input
                            type='text'
                            className='create-input-slanted bg-transparent w-full pr-20 h-16 text-lg'
                            placeholder=''
                            value={amount1}
                            onChange={handleAmount1Changed}
                        />
                        {token1 && <p className='create-button-text'>{token1.symbol}</p>}
                    </div>
                </div>
                <div className='flex mt-20'>
                    <button className='swap-button' onClick={handleCreatePool}>
                        <p className='swap-button-text'>SWAP</p>
                    </button>
                    <button className='swap-button-grey' onClick={onClose}>
                        <p className='swap-button-text'>Cancel</p>
                    </button>
                </div>
            </Box>
        </Modal>
    );
};

export default LiquidityPage;
