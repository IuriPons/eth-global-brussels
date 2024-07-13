import { Coin } from '@/types';

export const COINS: Coin[] = [
    {
        name: 'Ether',
        symbol: 'ETH',
        icon: '/assets/icons/ethereum.png',
        address: '0x0000000000000000000000000000000000000000',
    },
    {
        name: 'Tether',
        symbol: 'USDT',
        icon: '/assets/icons/usdt.png',
        address: '0x0000000000000000000000000000000000000001',
    },
    {
        name: 'DAI',
        symbol: 'DAI',
        icon: '/assets/icons/dai.png',
        address: '0x0000000000000000000000000000000000000002',
    },
    {
        name: 'USD Coin',
        symbol: 'USDC',
        icon: '/assets/icons/usdc.png',
        address: '0x0000000000000000000000000000000000000003',
    },
    {
        name: 'Wrapped Bitcoin',
        symbol: 'WBTC',
        icon: '/assets/icons/wbtc.png',
        address: '0x0000000000000000000000000000000000000004',
    },
    {
        name: 'Wrapped Ether',
        symbol: 'WETH',
        icon: '/assets/icons/weth.png',
        address: '0x0000000000000000000000000000000000000005',
    },
];

export const POOL_FACTORY_ADDRESS: `0x${string}` = process.env.NEXT_PUBLIC_POOL_FACTORY_ADDRESS as `0x${string}`;
export const VERIFY_USERS_ADDRESS: `0x${string}` = process.env.NEXT_PUBLIC_VERIFY_USERS_ADDRESS as `0x${string}`;
