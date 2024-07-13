import { decodeAbiParameters, parseAbiParameters } from 'viem';
import { useWriteContract } from 'wagmi';

// Contracts
import VerifyUsersABI from '@/contracts/VerifyUsersABI';

// Constants
import { VERIFY_USERS_ADDRESS } from '@/constants';

const useVerifyUsers = () => {
    const { writeContractAsync } = useWriteContract();

    const verifyUser = async (account: string, merkleRoot: string, nullifierHash: string, proof: `0x${string}`) => {
        await writeContractAsync({
            address: VERIFY_USERS_ADDRESS,
            abi: VerifyUsersABI,
            functionName: 'verifyAndExecute',
            args: [
                account,
                BigInt(merkleRoot),
                BigInt(nullifierHash),
                decodeAbiParameters(parseAbiParameters('uint256[8]'), proof)[0],
            ],
        });
    };

    return { verifyUser };
};

export default useVerifyUsers;
