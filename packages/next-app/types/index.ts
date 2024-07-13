export type SwapInfo = {
    sellAmount?: number;
    sellCoin?: Coin;
    buyAmount?: number;
    buyCoin?: Coin;
};

export type Coin = {
    name: string;
    symbol: string;
    icon: string;
    address: string;
};

export type Hook = {
    name: string;
    address: string;
};

export type PoolCreationInfo = {
    token0?: Coin;
    token1?: Coin;
    fee?: number;
    hook?: string;
};
