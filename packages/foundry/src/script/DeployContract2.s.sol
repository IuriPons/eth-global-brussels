// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";
import {Contract} from "../Contract.sol";
import { IWorldID } from '../interfaces/IWorldID.sol';

contract DeployContract2 is Script {


    function run() external {
        
        uint256 deployerPrivateKey = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;

        vm.startBroadcast(deployerPrivateKey);

        // Define the constructor arguments
        address arg1 = 0x11cA3127182f7583EfC416a8771BD4d11Fae4334;
        string memory arg2 = "app_staging_b4e61494fd04fdc4c360c113efcf750e";
        string memory arg3 = "test";


        // Deploy the contract
        Contract myContract = new Contract(IWorldID(arg1), arg2, arg3);

        uint256 root = 0x0740624477c82d223543c3cfd66363f2e06ac7a3e6968c1c39b5fb28932d046d;
        uint256 nullifierHash = 0x13c87a4b8b8b10f2b2d0d17e4237874c6e52953af74ce357c0b2e3d4c00d5d48;


        uint256[8] memory _validProof;
        _validProof[0] = 0x021c3802a2a44908c15071045e584b8639c6055e507ed9b605ca9c72b05721ef;
        _validProof[1] = 0x23f5d3009cab8b73676336392a80cb6451cc8ea068a1bca9d71e7906d4ed2b0c;
        _validProof[2] = 0x0dc0a8cda823f29eb1ccfb78878fb7bc2e32aaf10c32682ac5f2f919c857ec07;
        _validProof[3] = 0x06518fdac583b386b7e9c9c3b289f24f318cd29ca4d329043c43dfc27dde44e3;
        _validProof[4] = 0x2b8cf2118a93f1d47e4051adec522797a2d31147f893e37eaf6b70ddeb056f4c;
        _validProof[5] = 0x0d37f62ccc6aa759998ce7ce42f988ecc93272617b5fd75de2488fb4affc7e87;
        _validProof[6] = 0x2bb0c877b5f05033743da1fa2803205c3e136aaaac9b7d7e75803c31f3927dab;
        _validProof[7] = 0x29a93daa89d8cd3cdaea696c5f023e019c13892cf2f805dfa14d64b82757af75;

        uint256[8] memory _invalidProof;
        _invalidProof[0] = 1;

        //myContract.router();
        myContract.verifyAndExecute(msg.sender, root, nullifierHash, _validProof);
        vm.stopBroadcast();

    }
}