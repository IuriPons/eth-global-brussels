'use client';

import Image from 'next/image';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

// Hooks
import usePoolFactory from '@/hooks/usePoolFactory';

// MUI
import { Box, Button, Modal } from '@mui/material';

// Types
import { Hook, PoolCreationInfo } from '@/types';

// Constants
import { COINS, HOOKS } from '@/constants';

const CreatePage = () => {
    // Pool Factory Hook
    const { createPool } = usePoolFactory();

    // Snackbar Hook
    const { enqueueSnackbar } = useSnackbar();

    // States
    const [poolCreationInfo, setPoolCreationInfo] = useState<PoolCreationInfo>({});
    const [isTokenSelectorModalOpen, setIsTokenSelectorModalOpen] = useState(false);
    const [isChoosingToken0, setIsChoosingToken0] = useState(true);
    const [isHookSelectorModalOpen, setIsHookSelectorModalOpen] = useState(false);

    const { token0, token1, fee, hook, volumeLimit } = poolCreationInfo;

    const handleTokenSelectorModalOpen = (isToken0: boolean) => {
        setIsChoosingToken0(isToken0);
        setIsTokenSelectorModalOpen(true);
    };

    const handleTokenSelectorModalClose = () => {
        setIsTokenSelectorModalOpen(false);
    };

    const handleHookSelectorModalOpen = () => {
        setIsHookSelectorModalOpen(true);
    };

    const handleHookSelectorModalClose = () => {
        setIsHookSelectorModalOpen(false);
    };

    const handleTokenSelect = (symbol: string) => {
        setIsTokenSelectorModalOpen(false);

        const selectedCoin = COINS.find(coin => coin.symbol === symbol);

        if (!selectedCoin) {
            return;
        }

        if (isChoosingToken0) {
            let newToken1 = token1;

            if (selectedCoin.symbol === token1?.symbol) {
                newToken1 = token0;
            }

            setPoolCreationInfo({ ...poolCreationInfo, token0: selectedCoin, token1: newToken1 });
        } else {
            let newToken0 = token0;

            if (selectedCoin.symbol === token0?.symbol) {
                newToken0 = token1;
            }

            setPoolCreationInfo({ ...poolCreationInfo, token1: selectedCoin, token0: newToken0 });
        }
    };

    const handleHookSelect = (selectedHook: Hook) => {
        setPoolCreationInfo({ ...poolCreationInfo, hook: selectedHook });
        setIsHookSelectorModalOpen(false);
    };

    const handleCreatePool = async () => {
        if (!token0 || !token1 || !fee) {
            return;
        }

        try {
            await createPool(token0.address, token1.address, fee, hook?.address);

            enqueueSnackbar('Pool Created Successfully', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Failed to Create Pool', { variant: 'error' });
        }
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
                <div className='row flex items-center'>
                    <h2 className='create-title m-auto'>CREATE A POOL</h2>
                </div>
                <div className='row flex items-center'>
                    <p className='create-label w-40'>Select Pair</p>
                    <div className='create-div-slanted p-2 my-2 relative ml-20'>
                        <button
                            className='create-select-button absolute right-2 top-2 bottom-2 px-2 my-2 flex items-center justify-center'
                            onClick={() => handleTokenSelectorModalOpen(true)}
                        >
                            {token0 ? (
                                <div className='flex items-center space-x-2 create-selected-token-div'>
                                    <Image
                                        src={token0.icon}
                                        alt={token0.name}
                                        width={50}
                                        height={50}
                                        className='rounded-full'
                                    />
                                    <p>{token0.symbol}</p>
                                </div>
                            ) : (
                                <div className='flex items-center space-x-2 create-select-div'>
                                    <div className='create-circle-div'></div>
                                    <p>SELECT</p>
                                </div>
                            )}
                        </button>
                    </div>

                    <div className='create-div-slanted p-2 my-2 relative ml-20'>
                        <button
                            className='create-select-button absolute right-2 top-2 bottom-2 px-2 my-2 flex items-center justify-center'
                            onClick={() => handleTokenSelectorModalOpen(false)}
                        >
                            {token1 ? (
                                <div className='flex items-center space-x-2 create-selected-token-div'>
                                    <Image
                                        src={token1.icon}
                                        alt={token1.name}
                                        width={50}
                                        height={50}
                                        className='rounded-full'
                                    />
                                    <p>{token1.symbol}</p>
                                </div>
                            ) : (
                                <div className='flex items-center space-x-2 create-select-div'>
                                    <div className='create-circle-div'></div>
                                    <p>SELECT</p>
                                </div>
                            )}
                        </button>
                    </div>
                </div>

                <div className='row flex items-center'>
                    <p className='create-label w-40'>Fee</p>
                    <div className='create-div-slanted-light p-2 my-2 relative ml-20'>
                        <input
                            type='text'
                            className='create-input-slanted bg-transparent w-full pr-20 h-16 text-lg'
                            placeholder=''
                            value={fee}
                            onChange={e => setPoolCreationInfo({ ...poolCreationInfo, fee: +e.target.value })}
                        />
                        <p className='create-button-text'>wei</p>
                    </div>
                </div>
                <div className='row flex items-center'>
                    <p className='create-label w-40'>Swap Volume Limit</p>
                    <div className='create-div-slanted-light p-2 my-2 relative ml-20'>
                        <input
                            type='text'
                            className='create-input-slanted bg-transparent w-full pr-20 h-16 text-lg'
                            placeholder=''
                            value={volumeLimit}
                            onChange={e => setPoolCreationInfo({ ...poolCreationInfo, volumeLimit: +e.target.value })}
                        />
                    </div>
                </div>
                <div className='row flex items-center'>
                    <p className='create-label w-40'>Hook</p>
                    <div className='create-div-slanted p-2 my-2 relative ml-20'>
                        <button
                            className='create-select-button absolute right-2 top-2 bottom-2 px-2 my-2 flex items-center justify-center'
                            onClick={handleHookSelectorModalOpen}
                        >
                            {hook ? (
                                <div className='flex items-center space-x-2 create-selected-token-div'>
                                    <div className='create-circle-div'>
                                        <Image
                                            src={hook.icon}
                                            alt={hook.name}
                                            width={50}
                                            height={50}
                                            className='rounded-full'
                                        />
                                    </div>
                                    <p>{hook.name}</p>
                                </div>
                            ) : (
                                <div className='flex items-center space-x-2 create-select-div'>
                                    <div className='create-circle-div'></div>
                                    <p>SELECT</p>
                                </div>
                            )}
                        </button>
                    </div>

                    <div className='create-button-div'>
                        <button className='create-button' onClick={handleCreatePool}>
                            <p className='create-button-text'>CREATE</p>
                        </button>
                    </div>
                </div>
            </Box>

            <Modal
                open={isTokenSelectorModalOpen}
                onClose={handleTokenSelectorModalClose}
                aria-labelledby='select-token-modal-title'
                aria-describedby='select-token-modal-description'
            >
                <Box
                    className='modal-box bg-white p-6 rounded-lg shadow-lg'
                    sx={{
                        width: '500px',
                        height: '400px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <div id='select-token-modal-description' className='modal-container'>
                        <h1 className='text-2xl mb-6'>Select Token</h1>

                        {COINS.map(coin => (
                            <div
                                key={coin.symbol}
                                className='flex items-center space-x-4 mb-4 token-item'
                                onClick={() => handleTokenSelect(coin.symbol)}
                            >
                                <Image
                                    src={coin.icon}
                                    alt={coin.name}
                                    width={40}
                                    height={40}
                                    className='rounded-full'
                                />
                                <p>{coin.name}</p>
                            </div>
                        ))}

                        <Button
                            className='modal-close-button'
                            onClick={handleTokenSelectorModalClose}
                            variant='contained'
                            color='primary'
                        >
                            Close
                        </Button>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={isHookSelectorModalOpen}
                onClose={handleHookSelectorModalClose}
                aria-labelledby='select-hook-modal-title'
                aria-describedby='select-hook-modal-description'
            >
                <Box
                    className='modal-box bg-white p-6 rounded-lg shadow-lg'
                    sx={{
                        width: '500px',
                        height: '400px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <div id='select-hook-modal-description' className='modal-container'>
                        <h1 className='text-2xl mb-6'>Select Hook</h1>
                        {HOOKS.map(hook => (
                            <div
                                key={hook.name}
                                className='flex items-center space-x-4 mb-4 hook-item'
                                onClick={() => handleHookSelect(hook)}
                            >
                                <Image
                                    src={hook.icon}
                                    alt={hook.name}
                                    width={40}
                                    height={40}
                                    className='rounded-full'
                                />
                                <p>{hook.name}</p>
                            </div>
                        ))}

                        <Button
                            className='modal-close-button'
                            onClick={handleHookSelectorModalClose}
                            variant='contained'
                            color='primary'
                        >
                            Close
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default CreatePage;
