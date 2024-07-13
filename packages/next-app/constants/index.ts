import { Coin } from '@/types';

export const COINS: Coin[] = [
    {
        name: 'Tether',
        symbol: 'USDT',
        icon: 'usdt.png',
        address: '0x0000000000000000000000000000000000000001',
    },
    {
        name: 'DAI',
        symbol: 'DAI',
        icon: 'dai.png',
        address: '0x0000000000000000000000000000000000000002',
    },
    {
        name: 'USD Coin',
        symbol: 'USDC',
        icon: 'usdc.png',
        address: '0x0000000000000000000000000000000000000003',
    },
];

export const POOL_FACTORY_ADDRESS: `0x${string}` = process.env.NEXT_PUBLIC_POOL_FACTORY_ADDRESS as `0x${string}`;
export const VERIFY_USERS_ADDRESS: `0x${string}` = process.env.NEXT_PUBLIC_VERIFY_USERS_ADDRESS as `0x${string}`;
