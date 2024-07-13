import { Coin } from '@/types';

export const COINS: Coin[] = [
    {
        name: 'Tether',
        symbol: 'USDT',
        icon: 'usdt.png',
        address: '0x5416adf327242B7224413Dcd6E454FfcB5C1e73C',
    },
    {
        name: 'DAI',
        symbol: 'DAI',
        icon: 'dai.png',
        address: '0x73c1A1437920ECFEC6Ac079d717CB75c0B0e9086',
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
export const SWAP_ROUTER_ADDRESS: `0x${string}` = process.env.NEXT_PUBLIC_SWAP_ROUTER_ADDRESS as `0x${string}`;
