'use client';

import { useState } from 'react';
import { Box, Modal, Button } from '@mui/material';
import Image from 'next/image';
import { useConnectedAccount } from '@/context/AppContext';

const SwapPage = () => {
  const { setCreateHook } = useConnectedAccount();
  const [pairToken1, setPairToken1] = useState('USDC');
  const [pairToken2, setPairToken2] = useState('ETH');
  const [fee, setFee] = useState('0');
  const [hookName, setHookName] = useState('');
  const [hookAddress, setHookAddress] = useState('');
  const [volumeLimit, setVolumeLimit] = useState('0');

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
          height: '95vh',
          padding: '8% 12% 12% 12%',
          margin: 'auto',
        }}
      >
        <div className='row flex items-center'>
          <h2 className='create-title m-auto'>ADD LIQUIDITY</h2>
        </div>
        <div className='row flex items-center'>
          <p className='create-label w-40'>Select Pair</p>
          <div className='create-div-slanted p-2 my-2 relative ml-20'>
            <button
              className='create-select-button absolute right-2 top-2 bottom-2 px-2 my-2 flex items-center justify-center'
            >
              <div className='flex items-center space-x-2 create-selected-token-div'>
                <Image src={`/${pairToken1}.png`} alt={pairToken1} width={50} height={50} />
                <p>{pairToken1}</p>
              </div>
            </button>
          </div>

          <div className='create-div-slanted p-2 my-2 relative ml-20'>
            <button
              className='create-select-button absolute right-2 top-2 bottom-2 px-2 my-2 flex items-center justify-center'
            >
              <div className='flex items-center space-x-2 create-selected-token-div'>
                <Image src={`/${pairToken2}.png`} alt={pairToken2} width={50} height={50} />
                <p>{pairToken2}</p>
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
              value={fee}
              onChange={e => setFee(e.target.value)}
            />
            <p className='create-button-text'>{pairToken1}</p>
          </div>
        </div>
        <div className='row flex items-center'>
          <p className='create-label w-40'></p>
          <div className='create-div-slanted-light p-2 my-2 relative ml-20'>
            <input
              type='text'
              className='create-input-slanted bg-transparent w-full pr-20 h-16 text-lg'
              placeholder=''
              value={volumeLimit}
              onChange={e => setVolumeLimit(e.target.value)}
            />
            <p className='create-button-text'>{pairToken2}</p>
          </div>
        </div>
        <div className='flex mt-5'>
          <p className='create-label w-40'></p>
          <button className='swap-button' onClick={() => console.log('confirmed')}>
            <p className='swap-button-text'>SWAP</p>
          </button>
          <button className='swap-button-grey' onClick={() => console.log('confirmed')}>
            <p className='swap-button-text'>Cancel</p>
          </button>
        </div>
      </Box>
    </div>
  );
};

export default SwapPage;
