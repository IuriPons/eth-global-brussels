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
            args: [coin1Address, coin2Address, hook, fee, 79228162514264337593543950336, '0x00'],
        });
    };

    return { createPool };
};

export default usePoolFactory;
