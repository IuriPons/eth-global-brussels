
export type SwapInfo = {
    sellAmount?: number;
    sellCoin: Coin;
    buyAmount?: number;
    buyCoin: Coin;
}

export type Coin = {
    name: string;
    symbol: string;
    icon: string;
}

export type PoolCreationInfo = {
    coin1: Coin;
    coin2: Coin;
    fee: number;
    hook: string;
}