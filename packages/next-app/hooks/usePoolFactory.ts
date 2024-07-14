import { useWriteContract } from 'wagmi';

// Contracts
import IERC20ABI from '@/contracts/IERC20ABI';
import ILiquidityProviderABI from '@/contracts/ILiquidityProviderABI';
import ISwapRouterABI from '@/contracts/ISwapRouterABI';
import PoolFactoryABI from '@/contracts/PoolFactoryABI';

// Constants
import { LIQUIDITY_PROVIDER_ADDRESS, POOL_FACTORY_ADDRESS, SWAP_ROUTER_ADDRESS } from '@/constants';

const usePoolFactory = () => {
    const { writeContractAsync } = useWriteContract();

    const createPool = async (
        coin1Address: string,
        coin2Address: string,
        fee: number,
        hook: string | undefined = undefined
    ) => {
        await writeContractAsync({
            address: POOL_FACTORY_ADDRESS,
            abi: PoolFactoryABI,
            functionName: 'initPool',
            args: [
                coin1Address,
                coin2Address,
                hook ?? '0x0000000000000000000000000000000000000000',
                fee,
                79228162514264337593543950336,
                '0x00',
            ],
        });
    };

    const approve = async (currencyAddress: `0x${string}`, amount: number) => {
        await writeContractAsync({
            address: currencyAddress,
            abi: IERC20ABI,
            functionName: 'approve',
            args: [SWAP_ROUTER_ADDRESS, amount * 10 ** 18],
        });
    };

    const swap = async (currencyToSell: string, currencyToBuy: string, amount: number) => {
        const zeroForOne = currencyToSell < currencyToBuy;

        await writeContractAsync({
            address: SWAP_ROUTER_ADDRESS,
            abi: ISwapRouterABI,
            functionName: 'swap',
            args: [
                {
                    currency0: currencyToSell,
                    currency1: currencyToBuy,
                    fee: 300,
                    tickSpacing: 60,
                    hooks: '0x0000000000000000000000000000000000000000',
                },
                {
                    zeroForOne: zeroForOne,
                    amountSpecified: amount * 10 ** 18,
                    sqrtPriceLimitX96: 4295128739 + 1,
                },
                { takeClaims: false, settleUsingBurn: false },
                '0x00',
            ],
        });
    };

    const approveLiquidity = async (currencyAddress: `0x${string}`, amount: number) => {
        await writeContractAsync({
            address: currencyAddress,
            abi: IERC20ABI,
            functionName: 'approve',
            args: [LIQUIDITY_PROVIDER_ADDRESS, amount * 10 ** 18],
        });
    };

    const addLiquidity = async (
        currency0: string,
        currency1: string,
        fee: number,
        amount0: number,
        amount1: number
    ) => {
        await writeContractAsync({
            address: LIQUIDITY_PROVIDER_ADDRESS,
            abi: ILiquidityProviderABI,
            functionName: 'modifyLiquidity',
            args: [
                {
                    currency0: currency0,
                    currency1: currency1,
                    fee: fee,
                    tickSpacing: 60,
                    hooks: '0x0000000000000000000000000000000000000000',
                },
                {
                    tickLower: -600,
                    tickUpper: 600,
                    liquidityDelta: amount0,
                    salt: '0x0000000000000000000000000000000000000000000000000000000000000000',
                },
                '0x00',
            ],
        });
    };

    return { createPool, swap, approve, addLiquidity, approveLiquidity };
};

export default usePoolFactory;
