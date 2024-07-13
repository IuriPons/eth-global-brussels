import { useWriteContract } from 'wagmi';

// Contracts
import IERC20ABI from '@/contracts/IERC20ABI';
import ISwapRouterABI from '@/contracts/ISwapRouterABI';
import PoolFactoryABI from '@/contracts/PoolFactoryABI';

// Constants
import { POOL_FACTORY_ADDRESS, SWAP_ROUTER_ADDRESS } from '@/constants';

const usePoolFactory = () => {
    const { writeContractAsync } = useWriteContract();

    const createPool = async (
        coin1Address: string,
        coin2Address: string,
        fee: number,
        hook: number | undefined = undefined
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

    // const swap = async (currencyToSell: string, currencyToBuy: string, amount: number) => {
    //     await writeContractAsync({
    //         address: POOL_FACTORY_ADDRESS,
    //         abi: PoolFactoryABI,
    //         functionName: 'swap',
    //         args: [
    //             currencyToSell,
    //             currencyToBuy,
    //             amount
    //         ],
    //     });
    // };

    const approve = async (currencyToSell: string, currencyToBuy: string, amount: number) => {
        await writeContractAsync({
            address: currencyToSell as `0x${string}`,
            abi: IERC20ABI,
            functionName: 'approve',
            args: [SWAP_ROUTER_ADDRESS, amount],
        });
    };

    const swap = async (currencyToSell: string, currencyToBuy: string, amount: number) => {
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
                    zeroForOne: true,
                    amountSpecified: amount,
                    sqrtPriceLimitX96: 4295128739 + 1,
                },
                '0x00',
            ],
        });
    };

    return { createPool, swap, approve };
};

export default usePoolFactory;
