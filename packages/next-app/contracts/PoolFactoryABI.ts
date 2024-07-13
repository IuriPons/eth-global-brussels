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
        name: 'counter',
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
        name: 'silly',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'silly1',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'silly10',
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
        name: 'silly11',
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
        name: 'silly12',
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
        name: 'silly2',
        inputs: [
            {
                name: '_currency0',
                type: 'address',
                internalType: 'Currency',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'silly3',
        inputs: [
            {
                name: '_currency0',
                type: 'address',
                internalType: 'Currency',
            },
            {
                name: 'initData',
                type: 'bytes',
                internalType: 'bytes',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'silly4',
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
                name: 'initData',
                type: 'bytes',
                internalType: 'bytes',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'silly5',
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
                name: 'initData',
                type: 'bytes',
                internalType: 'bytes',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'silly6',
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
                name: 'initData',
                type: 'bytes',
                internalType: 'bytes',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'silly7',
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
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'silly8',
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
        name: 'silly9',
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
];

export default PoolFactoryABI;
