// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";
import {Contract} from "../src/Contract.sol";
import { IWorldID } from '../src/interfaces/IWorldID.sol';

contract DeployContract is Script {


    function run() external {
        
        uint256 deployerPrivateKey = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;

        vm.startBroadcast(deployerPrivateKey);

        // Define the constructor arguments
        address arg1 = 0x11cA3127182f7583EfC416a8771BD4d11Fae4334;
        string memory arg2 = "app_staging_b4e61494fd04fdc4c360c113efcf750e";
        string memory arg3 = "test";


        // Deploy the contract
        Contract myContract = new Contract(IWorldID(arg1), arg2, arg3);

        uint256 root = 0x022602ab949da5bf549f1bde260ec829676e0229f29900a98610f02923dae3c5;
        uint256 nullifierHash = 0x19333b69bf9f0e1386ba67d60c15348368457db473a1add10dec263d20ae1896;


        uint256[8] memory _validProof;
        _validProof[0] = 0x05efd28f85f9427d20eaa7cfed716f9670b8e2d9c8ef6911acc29a865ef4fb36;
        _validProof[1] = 0x193a5ba80fcc04c929ae72802b354b461a3450943f289660690feec7276ccc3e;
        _validProof[2] = 0x0da06f65a35b5c9acbfcf24c2adffa15716005aedebbc8b178a115d6db8930f0;
        _validProof[3] = 0x16faedc0f2e0b4559347b81cb3bcad6b461db5071200c2e2c96a8b26bbd56c54;
        _validProof[4] = 0x29b25e81c33a0535ea57c0629be46477d0fdbe1788493ca691d6fdf367aadcc3;
        _validProof[5] = 0x222ff5a687e61871655645670df87d17d0d2158db804e3f3b4710526dc61047f;
        _validProof[6] = 0x21a93b17a5bf5d648a2e999fb147956c8afcaee3f3091702348514f1fa83bb30;
        _validProof[7] = 0x1b48a0a5470587c349c45d6a1ca6377ab8edac75c980104579ddbfa3fc63b95a;

        uint256[8] memory _invalidProof;
        _invalidProof[0] = 1;

        //myContract.router();
        myContract.verifyAndExecute(0x69135eD590c9c55B2ECF6B850442b9C84b3D6a59, root, nullifierHash, _validProof);
        vm.stopBroadcast();

    }
}