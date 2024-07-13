const PoolFactoryABI = [
    {
        type: 'constructor',
        inputs: [
            { name: '_manager', type: 'address', internalType: 'contract IPoolManager' },
            { name: '_swapRouter', type: 'address', internalType: 'address' },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'countPools',
        inputs: [],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'initPool',
        inputs: [
            { name: '_currency0', type: 'address', internalType: 'Currency' },
            { name: '_currency1', type: 'address', internalType: 'Currency' },
            { name: 'hooks', type: 'address', internalType: 'contract IHooks' },
            { name: 'fee', type: 'uint24', internalType: 'uint24' },
            { name: 'sqrtPriceX96', type: 'uint160', internalType: 'uint160' },
            { name: 'initData', type: 'bytes', internalType: 'bytes' },
        ],
        outputs: [
            {
                name: '_key',
                type: 'tuple',
                internalType: 'struct PoolKey',
                components: [
                    { name: 'currency0', type: 'address', internalType: 'Currency' },
                    { name: 'currency1', type: 'address', internalType: 'Currency' },
                    { name: 'fee', type: 'uint24', internalType: 'uint24' },
                    { name: 'tickSpacing', type: 'int24', internalType: 'int24' },
                    { name: 'hooks', type: 'address', internalType: 'contract IHooks' },
                ],
            },
            { name: 'id', type: 'bytes32', internalType: 'PoolId' },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'manager',
        inputs: [],
        outputs: [{ name: '', type: 'address', internalType: 'contract IPoolManager' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'poolInfos',
        inputs: [{ name: 'poolId', type: 'bytes32', internalType: 'bytes32' }],
        outputs: [
            { name: 'currency0', type: 'address', internalType: 'Currency' },
            { name: 'currency1', type: 'address', internalType: 'Currency' },
            { name: 'fee', type: 'uint24', internalType: 'uint24' },
            { name: 'tickSpacing', type: 'int24', internalType: 'int24' },
            { name: 'hooks', type: 'address', internalType: 'contract IHooks' },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'swap',
        inputs: [
            { name: 'currency0', type: 'address', internalType: 'address' },
            { name: 'currency1', type: 'address', internalType: 'address' },
            { name: 'amount', type: 'int256', internalType: 'int256' },
        ],
        outputs: [{ name: 'delta', type: 'int256', internalType: 'BalanceDelta' }],
        stateMutability: 'payable',
    },
    {
        type: 'function',
        name: 'swapRouter',
        inputs: [],
        outputs: [{ name: '', type: 'address', internalType: 'contract ISwapRouter' }],
        stateMutability: 'view',
    },
];

export default PoolFactoryABI;
