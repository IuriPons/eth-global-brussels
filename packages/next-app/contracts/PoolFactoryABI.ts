const PoolFactoryABI = [
    {
        type: 'constructor',
        inputs: [
            {
                name: '_manager',
                type: 'address',
                internalType: 'contract IPoolManager',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'countPools',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getPools',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'tuple[]',
                internalType: 'struct PoolKey[]',
                components: [
                    {
                        name: 'currency0',
                        type: 'address',
                        internalType: 'Currency',
                    },
                    {
                        name: 'currency1',
                        type: 'address',
                        internalType: 'Currency',
                    },
                    {
                        name: 'fee',
                        type: 'uint24',
                        internalType: 'uint24',
                    },
                    {
                        name: 'tickSpacing',
                        type: 'int24',
                        internalType: 'int24',
                    },
                    {
                        name: 'hooks',
                        type: 'address',
                        internalType: 'contract IHooks',
                    },
                ],
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'initPool',
        inputs: [
            {
                name: '_currency0',
                type: 'address',
                internalType: 'Currency',
            },
            {
                name: '_currency1',
                type: 'address',
                internalType: 'Currency',
            },
            {
                name: 'hooks',
                type: 'address',
                internalType: 'contract IHooks',
            },
            {
                name: 'fee',
                type: 'uint24',
                internalType: 'uint24',
            },
            {
                name: 'sqrtPriceX96',
                type: 'uint160',
                internalType: 'uint160',
            },
            {
                name: 'initData',
                type: 'bytes',
                internalType: 'bytes',
            },
        ],
        outputs: [
            {
                name: '_key',
                type: 'tuple',
                internalType: 'struct PoolKey',
                components: [
                    {
                        name: 'currency0',
                        type: 'address',
                        internalType: 'Currency',
                    },
                    {
                        name: 'currency1',
                        type: 'address',
                        internalType: 'Currency',
                    },
                    {
                        name: 'fee',
                        type: 'uint24',
                        internalType: 'uint24',
                    },
                    {
                        name: 'tickSpacing',
                        type: 'int24',
                        internalType: 'int24',
                    },
                    {
                        name: 'hooks',
                        type: 'address',
                        internalType: 'contract IHooks',
                    },
                ],
            },
            {
                name: 'id',
                type: 'bytes32',
                internalType: 'PoolId',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'manager',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'address',
                internalType: 'contract IPoolManager',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'poolInfos',
        inputs: [
            {
                name: 'poolId',
                type: 'bytes32',
                internalType: 'bytes32',
            },
        ],
        outputs: [
            {
                name: 'currency0',
                type: 'address',
                internalType: 'Currency',
            },
            {
                name: 'currency1',
                type: 'address',
                internalType: 'Currency',
            },
            {
                name: 'fee',
                type: 'uint24',
                internalType: 'uint24',
            },
            {
                name: 'tickSpacing',
                type: 'int24',
                internalType: 'int24',
            },
            {
                name: 'hooks',
                type: 'address',
                internalType: 'contract IHooks',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'pools',
        inputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                name: 'currency0',
                type: 'address',
                internalType: 'Currency',
            },
            {
                name: 'currency1',
                type: 'address',
                internalType: 'Currency',
            },
            {
                name: 'fee',
                type: 'uint24',
                internalType: 'uint24',
            },
            {
                name: 'tickSpacing',
                type: 'int24',
                internalType: 'int24',
            },
            {
                name: 'hooks',
                type: 'address',
                internalType: 'contract IHooks',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'poolsByOwner',
        inputs: [
            {
                name: 'owner',
                type: 'address',
                internalType: 'address',
            },
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                name: 'currency0',
                type: 'address',
                internalType: 'Currency',
            },
            {
                name: 'currency1',
                type: 'address',
                internalType: 'Currency',
            },
            {
                name: 'fee',
                type: 'uint24',
                internalType: 'uint24',
            },
            {
                name: 'tickSpacing',
                type: 'int24',
                internalType: 'int24',
            },
            {
                name: 'hooks',
                type: 'address',
                internalType: 'contract IHooks',
            },
        ],
        stateMutability: 'view',
    },
];

export default PoolFactoryABI;
