'use client';

import VerifyButton from '@/components/ui/VerifyButton';
import { Box, Button, Modal } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { useConnectedAccount, useVerification } from '@/context/AppContext';

// Hooks
import usePoolFactory from '@/hooks/usePoolFactory';

// Types
import { SwapInfo } from '@/types';

// Constants
import { COINS } from '@/constants';

const SwapPage = () => {
    // Hooks
    const { swap, approve } = usePoolFactory();

    // States
    const [swapInfo, setSwapInfo] = useState<SwapInfo>({});
    const [isChoosingSellingToken, setIsChoosingSellingToken] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { verifyMessage } = useVerification();

    const { sellAmount, sellCoin, buyAmount, buyCoin } = swapInfo;

    const handleSellAmountChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sellValue = Number(e.target.value);
        setSwapInfo({ ...swapInfo, sellAmount: sellValue, buyAmount: sellValue });
    };

    const handleBuyAmountChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const buyValue = Number(e.target.value);
        setSwapInfo({ ...swapInfo, buyAmount: buyValue, sellAmount: buyValue });
    };

    const handleModalOpen = (isSellingToken: boolean) => {
        setIsChoosingSellingToken(isSellingToken);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleTokenSelect = (symbol: string) => {
        setIsModalOpen(false);

        const selectedCoin = COINS.find(coin => coin.symbol === symbol);

        if (!selectedCoin) {
            return;
        }

        if (isChoosingSellingToken) {
            let newBuyCoin = buyCoin;

            if (selectedCoin.symbol === buyCoin?.symbol) {
                newBuyCoin = sellCoin;
            }

            setSwapInfo({ ...swapInfo, sellCoin: selectedCoin, buyCoin: newBuyCoin });
        } else {
            let newSellCoin = sellCoin;

            if (selectedCoin.symbol === sellCoin?.symbol) {
                newSellCoin = buyCoin;
            }

            setSwapInfo({ ...swapInfo, buyCoin: selectedCoin, sellCoin: newSellCoin });
        }
    };

    const handleSubmit = () => {
        console.log('Swap Info:', swapInfo);

        if (!sellCoin || !buyCoin || !sellAmount) {
            return;
        }

        approve(sellCoin?.address, buyCoin?.address, sellAmount);

        swap(sellCoin?.address, buyCoin?.address, sellAmount);
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    height: '95vh',
                    padding: '0 12% 14% 12%',
                }}
            >
                <div className='coin-box p-6 rounded-lg'>
                    <div className='div-slanted p-2 my-2 relative ml-20 mb-4'>
                        <p className='div-slanted-text'>SELL</p>
                        <input
                            type='number'
                            className='input-slanted bg-transparent w-full pr-20 h-16 text-lg'
                            placeholder=''
                            value={sellAmount}
                            onInput={handleSellAmountChanged}
                        />
                        <button
                            className='select-button absolute right-2 top-2 bottom-2 px-2 my-2 flex items-center justify-center'
                            onClick={() => handleModalOpen(true)}
                        >
                            {sellCoin ? (
                                <div className='flex items-center space-x-2 selected-token-div'>
                                    <p>{sellCoin.symbol}</p>
                                    <Image
                                        src={`/${sellCoin.icon}`}
                                        alt={sellCoin.name}
                                        width={50}
                                        height={50}
                                        className='rounded-full'
                                    />
                                </div>
                            ) : (
                                <div className='flex items-center space-x-2 select-div'>
                                    <p>SELECT</p>
                                    <div className='circle-div'></div>
                                </div>
                            )}
                        </button>
                    </div>
                    <div className='div-slanted p-2 my-2 relative mb-4'>
                        <p className='div-slanted-text'>BUY</p>
                        <input
                            type='number'
                            className='input-slanted bg-transparent w-full pr-20 h-16 text-lg'
                            placeholder=''
                            value={buyAmount}
                            onInput={handleBuyAmountChanged}
                        />
                        <button
                            className='select-button absolute right-2 top-2 bottom-2 px-2 my-2 flex items-center justify-center'
                            onClick={() => handleModalOpen(false)}
                        >
                            {buyCoin ? (
                                <div className='flex items-center space-x-2 selected-token-div'>
                                    <p>{buyCoin.symbol}</p>
                                    <Image
                                        src={`/${buyCoin.icon}`}
                                        alt={buyCoin.name}
                                        width={50}
                                        height={50}
                                        className='rounded-full'
                                    />
                                </div>
                            ) : (
                                <div className='flex items-center space-x-2 select-div'>
                                    <p>SELECT</p>
                                    <div className='circle-div'></div>
                                </div>
                            )}
                        </button>
                    </div>
                    <div className='flex'>
                        <button className='swap-button' onClick={handleSubmit}>
                            <p className='swap-button-text'>SWAP</p>
                        </button>
                    </div>
                </div>
                <div className='center-div'>
                    <p className='center-text ml-20'>REACH</p>
                    <p className='center-text ml-10'>MORE</p>
                    <p className='center-text'>DEPTH</p>
                </div>
                <div className='center-div'>
                    <p className='last-text1'>TRANSACTION VOLUME</p>
                    <p className='last-text2'>Unlimited token/transaction</p>
                    {verifyMessage ? (
                        <button className='verified-button' onClick={open}>
                        <img src='/worldcoinlogo-green.gif' alt='Worldcoin Logo' className='wc-logo' />
                        You are human!
                    </button>
                ):
                        (<VerifyButton />)
                }


                </div>
            </Box>

            <Modal
                open={isModalOpen}
                onClose={handleModalClose}
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
                                    src={`/${coin.icon}`}
                                    alt={coin.symbol}
                                    width={40}
                                    height={40}
                                    className='rounded-full'
                                />
                                <p>{coin.symbol}</p>
                            </div>
                        ))}

                        <Button
                            className='modal-close-button'
                            onClick={handleModalClose}
                            variant='contained'
                            color='primary'
                        >
                            Close
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default SwapPage;
