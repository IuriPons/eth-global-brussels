import { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';

// Contracts
import PoolFactoryABI from '@/contracts/PoolFactoryABI';

// Constants
import { COINS, HOOKS, POOL_FACTORY_ADDRESS } from '@/constants';

// Types
import { Pool } from '@/types';

const usePools = () => {
    // Read Contract Hook
    const { data, error, isLoading } = useReadContract({
        address: POOL_FACTORY_ADDRESS,
        abi: PoolFactoryABI,
        functionName: 'getPools',
    });

    // States
    const [pools, setPools] = useState<Pool[]>([]);

    useEffect(() => {
        if (data && Array.isArray(data)) {
            const parse: Pool[] = data.map((pool: any) => {
                const currency0 = COINS.find(coin => coin.address === pool.currency0);
                const currency1 = COINS.find(coin => coin.address === pool.currency1);
                const hook = HOOKS.find(hook => hook.address === pool.hook);

                return {
                    currency0,
                    currency1,
                    fee: pool.fee,
                    hook,
                };
            });

            setPools(parse);
        }
        // else {
        //     setPools([
        //         {
        //             currency0: COINS[0],
        //             currency1: COINS[1],
        //             fee: 300,
        //         },
        //         {
        //             currency0: COINS[2],
        //             currency1: COINS[1],
        //             fee: 400,
        //             hook: HOOKS[0],
        //         },
        //     ]);
        // }
    }, [data]);

    return { pools, error, isLoading };
};

export default usePools;
