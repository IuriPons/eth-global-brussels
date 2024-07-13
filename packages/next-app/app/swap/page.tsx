'use client';

import { useState } from 'react';
import { Box, Modal, Button, Typography } from '@mui/material';
import Image from 'next/image';

const SwapPage = () => {
    const [amountSell, setAmountSell] = useState('0');
    const [amountBuy, setAmountBuy] = useState('0');
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [selectedTokenSell, setSelectedTokenSell] = useState(null);
    const [selectedTokenBuy, setSelectedTokenBuy] = useState(null);

    const handleSellInput = e => {
        const sellValue = e.target.value;
        setAmountSell(sellValue);
        setAmountBuy((sellValue * 2).toString());
    };

    const handleBuyInput = e => {
        const buyValue = e.target.value;
        setAmountBuy(buyValue);
        setAmountSell((buyValue / 2).toString());
    };

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

    const handleTokenSelect1 = tokenName => {
        setSelectedTokenSell(tokenName); // For Sell input
        setIsModalOpen1(false); // Close the modal after selecting a token
    };

    const handleTokenSelect2 = tokenName => {
        setSelectedTokenBuy(tokenName); // For Buy input
        setIsModalOpen2(false); // Close the modal after selecting a token
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '95vh' }}>
            <div className='coin-box mx-auto p-6 rounded-lg'>
                <h1 className='text-2xl mb-6'>Swap</h1>
                <div className='mb-4'>
                    <p className='font-bold'>Sell</p>
                    <div className='flex flex-col p-2 my-2 border border-primary rounded-lg z-1 relative'>
                        <input
                            type='text'
                            className='bg-transparent w-full pr-20 h-16 text-lg'
                            placeholder='Enter sell amount'
                            value={amountSell}
                            onInput={handleSellInput}
                        />
                        <button
                            className='select-button absolute right-2 top-2 bottom-2 px-2 my-2 flex items-center justify-center'
                            onClick={handleModalOpen1}
                        >
                            {selectedTokenSell ? (
                                <div className='flex items-center space-x-2'>
                                    <Image
                                        src={`/${selectedTokenSell}.png`}
                                        alt={selectedTokenSell}
                                        width={20}
                                        height={20}
                                    />
                                    <p>{selectedTokenSell}</p>
                                </div>
                            ) : (
                                'Select Token'
                            )}
                        </button>
                    </div>
                </div>
                <div className='mb-4'>
                    <p className='font-bold'>Buy</p>
                    <div className='flex flex-col p-2 my-2 border border-primary rounded-lg relative'>
                        <input
                            type='text'
                            className='bg-transparent w-full pr-20 h-16 text-lg'
                            placeholder='Enter buy amount'
                            value={amountBuy}
                            onInput={handleBuyInput}
                        />
                        <button
                            className='select-button absolute right-2 top-2 bottom-2 px-2 my-2 flex items-center justify-center'
                            onClick={handleModalOpen2}
                        >
                            {selectedTokenBuy ? (
                                <div className='flex items-center space-x-2'>
                                    <Image
                                        src={`/${selectedTokenBuy}.png`}
                                        alt={selectedTokenBuy}
                                        width={20}
                                        height={20}
                                    />
                                    <p>{selectedTokenBuy}</p>
                                </div>
                            ) : (
                                'Select Token'
                            )}
                        </button>
                    </div>
                </div>
                <button
                    className='mt-10 flex flex-row items-center justify-around w-full bg-white bg-opacity-20 rounded-lg shadow-md backdrop-filter backdrop-blur-md border border-white border-opacity-30 p-4'
                    style={{
                        background: 'linear-gradient(#05FFE6, #510CA7)',
                        color: 'white',
                    }}
                    onClick={() => console.log('confirmed')}
                >
                    Confirm Swap
                </button>
            </div>

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
                            onClick={() => handleTokenSelect1('Ethereum')}
                        >
                            <Image src='/ethereum.png' alt='Ethereum' width={40} height={40} />
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
                    <div id='select-token-modal-description' className='mt-4'>
                        <h1 className='text-2xl mb-6'>Select Token</h1>
                        <div
                            className='flex items-center space-x-4 mb-4 token-item'
                            onClick={() => handleTokenSelect2('WBTC')}
                        >
                            <Image src='/wbtc.png' alt='WBTC' width={40} height={40} />
                            <p>WBTC (BTC)</p>
                        </div>
                        <div
                            className='flex items-center space-x-4 mb-4 token-item'
                            onClick={() => handleTokenSelect2('Ethereum')}
                        >
                            <Image src='/ethereum.png' alt='Ethereum' width={40} height={40} />
                            <p>Ethereum (ETH)</p>
                        </div>
                        <div
                            className='flex items-center space-x-4 mb-4 token-item'
                            onClick={() => handleTokenSelect2('USDC')}
                        >
                            <Image src='/usdc.png' alt='USDC' width={40} height={40} />
                            <p>USDC</p>
                        </div>
                        <Button onClick={handleModalClose2} variant='contained' color='primary'>
                            Close
                        </Button>
                    </div>
                </Box>
            </Modal>
        </Box>
    );
};

export default SwapPage;
