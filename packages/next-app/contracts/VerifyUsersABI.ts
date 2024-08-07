const VerifyUsersABI = [
    {
        type: 'constructor',
        inputs: [
            {
                name: '_worldId',
                type: 'address',
                internalType: 'contract IWorldID',
            },
            {
                name: '_appId',
                type: 'string',
                internalType: 'string',
            },
            {
                name: '_actionId',
                type: 'string',
                internalType: 'string',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'verifiedUsers',
        inputs: [
            {
                name: '',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'bool',
                internalType: 'bool',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'verifyAndExecute',
        inputs: [
            {
                name: 'signal',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'root',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'nullifierHash',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'proof',
                type: 'uint256[8]',
                internalType: 'uint256[8]',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'event',
        name: 'Verified',
        inputs: [
            {
                name: 'nullifierHash',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
        ],
        anonymous: false,
    },
    {
        type: 'error',
        name: 'DuplicateNullifier',
        inputs: [
            {
                name: 'nullifierHash',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
    },
];

export default VerifyUsersABI;
