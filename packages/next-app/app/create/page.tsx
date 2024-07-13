'use client';

import { useState } from 'react';
import { Box, Modal, Button } from '@mui/material';
import Image from 'next/image';
import { useConnectedAccount } from '@/context/AppContext';

const SwapPage = () => {
    const { setCreateHook } = useConnectedAccount();
    const [pairToken1, setPairToken1] = useState('');
    const [pairToken2, setPairToken2] = useState('');
    const [fee, setFee] = useState('0');
    const [hookName, setHookName] = useState('');
    const [hookAddress, setHookAddress] = useState('');
    const [volumeLimit, setVolumeLimit] = useState('0');
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);

    const handleModalOpen1 = () => {
        setIsModalOpen1(true);
    };

    const handleModalClose1 = () => {
        setIsModalOpen1(false);
    };

    const handleModalOpen2 = () => {
        setIsModalOpen2(true);
    };

    const handleModalClose2 = () => {
        setIsModalOpen2(false);
    };

    const handleModalOpen3 = () => {
        setIsModalOpen3(true);
    };

    const handleModalClose3 = () => {
        setIsModalOpen3(false);
    };

    const handleTokenSelect1 = (tokenName: string) => {
        setPairToken1(tokenName);
        setIsModalOpen1(false);
    };

    const handleTokenSelect2 = (tokenName: string) => {
        setPairToken2(tokenName);
        setIsModalOpen2(false);
    };

    const handleHookSelect = (name: string, address: string) => {
        setHookName(name);
        setHookAddress(address);
        setIsModalOpen3(false);
    };

    const handleCreatePool = () => {
        const createHook = {
            pairToken1,
            pairToken2,
            fee: Number(fee),
            hookName,
            hookAddress,
            volumeLimit,
        };
        setCreateHook(createHook);
        console.log('createHook object:', createHook);
    };

    return (
        <div className='row flex'>
            <Box
                sx={{
                    height: '100vh',
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
                            onClick={handleModalOpen1}
                        >
                            {pairToken1 ? (
                                <div className='flex items-center space-x-2 create-selected-token-div'>
                                    <Image src={`/${pairToken1}.png`} alt={pairToken1} width={50} height={50} />
                                    <p>{pairToken1}</p>
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
                            onClick={handleModalOpen2}
                        >
                            {pairToken2 ? (
                                <div className='flex items-center space-x-2 create-selected-token-div'>
                                    <Image src={`/${pairToken2}.png`} alt={pairToken2} width={50} height={50} />
                                    <p>{pairToken2}</p>
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
                            onChange={e => setFee(e.target.value)}
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
                            onChange={e => setVolumeLimit(e.target.value)}
                        />
                    </div>
                </div>
                <div className='row flex items-center'>
                    <p className='create-label w-40'>Hook</p>
                    <div className='create-div-slanted p-2 my-2 relative ml-20'>
                        <button
                            className='create-select-button absolute right-2 top-2 bottom-2 px-2 my-2 flex items-center justify-center'
                            onClick={handleModalOpen3}
                        >
                            {hookName ? (
                                <div className='flex items-center space-x-2 create-selected-token-div'>
                                    <div className='create-circle-div'>{hookName == 'Hook1' ? '1' : '2'}</div>
                                    <p>{hookAddress}</p>
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
                open={isModalOpen1}
                onClose={handleModalClose1}
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
                        <div
                            className='flex items-center space-x-4 mb-4 token-item'
                            onClick={() => handleTokenSelect1('WBTC')}
                        >
                            <Image src='/wbtc.png' alt='WBTC' width={40} height={40} />
                            <p>WBTC (BTC)</p>
                        </div>
                        <div
                            className='flex items-center space-x-4 mb-4 token-item'
                            onClick={() => handleTokenSelect1('ETH')}
                        >
                            <Image src='/eth.png' alt='eth' width={40} height={40} />
                            <p>Ethereum (ETH)</p>
                        </div>
                        <div
                            className='flex items-center space-x-4 mb-4 token-item'
                            onClick={() => handleTokenSelect1('USDC')}
                        >
                            <Image src='/usdc.png' alt='USDC' width={40} height={40} />
                            <p>USDC</p>
                        </div>
                        <Button
                            className='modal-close-button'
                            onClick={handleModalClose1}
                            variant='contained'
                            color='primary'
                        >
                            Close
                        </Button>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={isModalOpen2}
                onClose={handleModalClose2}
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
                        <div
                            className='flex items-center space-x-4 mb-4 token-item'
                            onClick={() => handleTokenSelect2('WBTC')}
                        >
                            <Image src='/wbtc.png' alt='WBTC' width={40} height={40} />
                            <p>WBTC</p>
                        </div>
                        <div
                            className='flex items-center space-x-4 mb-4 token-item'
                            onClick={() => handleTokenSelect2('ETH')}
                        >
                            <Image src='/eth.png' alt='eth' width={40} height={40} />
                            <p>ETH</p>
                        </div>
                        <div
                            className='flex items-center space-x-4 mb-4 token-item'
                            onClick={() => handleTokenSelect2('USDC')}
                        >
                            <Image src='/usdc.png' alt='USDC' width={40} height={40} />
                            <p>USDC</p>
                        </div>
                        <Button
                            className='modal-close-button'
                            onClick={handleModalClose2}
                            variant='contained'
                            color='primary'
                        >
                            Close
                        </Button>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={isModalOpen3}
                onClose={handleModalClose3}
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
                        <div
                            className='flex items-center space-x-4 mb-4 hook-item'
                            onClick={() => handleHookSelect('Hook1', '0x123')}
                        >
                            <p>Hook 1: Name: 0x123...</p>
                        </div>
                        <div
                            className='flex items-center space-x-4 mb-4 hook-item'
                            onClick={() => handleHookSelect('Hook2', '0x456')}
                        >
                            <p>Hook 2: Name: 0x123...</p>
                        </div>
                        <Button
                            className='modal-close-button'
                            onClick={handleModalClose3}
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

export default SwapPage;
