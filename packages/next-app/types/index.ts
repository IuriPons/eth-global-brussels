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
    icon: string;
    address: string;
};

export type PoolCreationInfo = {
    token0?: Coin;
    token1?: Coin;
    fee?: number;
    hook?: Hook;
    volumeLimit?: number;
};

export type Pool = {
    currency0?: Coin;
    currency1?: Coin;
    fee: number;
    hook?: Hook;
};

export type AddLiquidtyInfo = {
    token0?: Coin;
    token1?: Coin;
    amount0: number;
    amount1: number;
};
