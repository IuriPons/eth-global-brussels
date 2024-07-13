import { useWriteContract } from 'wagmi';

// Contracts
import PoolFactoryABI from '@/contracts/PoolFactoryABI';

// Constants
import { POOL_FACTORY_ADDRESS } from '@/constants';

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

    const swap = async (currencyToSell: string, currencyToBuy: string, amount: number) => {
        await writeContractAsync({
            address: POOL_FACTORY_ADDRESS,
            abi: PoolFactoryABI,
            functionName: 'swap',
            args: [
                currencyToSell,
                currencyToBuy,
                amount
            ],
        });
    };

    return { createPool, swap };
};

export default usePoolFactory;
