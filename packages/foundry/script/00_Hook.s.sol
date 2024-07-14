// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import {Vm} from "forge-std/Test.sol";

import {Hooks} from "v4-core/libraries/Hooks.sol";
import {IPoolManager} from "v4-core/interfaces/IPoolManager.sol";

import {HookMiner} from "../script/utils/HookMiner.sol";
import {KYCHook} from "../src/KYCHook.sol";
import "forge-std/console.sol";

contract HookScript is Script {
    address constant CREATE2_DEPLOYER = address(0x4e59b44847b379578588920cA78FbF26c0B4956C);
    address constant GOERLI_POOLMANAGER = address(0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b);

    function setUp() public {}

    function run() public {
        // hook contracts must have specific flags encoded in the address
        uint160 flags = uint160(
            Hooks.BEFORE_SWAP_FLAG 
        );

        // Mine a salt that will produce a hook address with the correct flags
        (address hookAddress, bytes32 salt) =
            HookMiner.find(CREATE2_DEPLOYER, flags, type(KYCHook).creationCode, abi.encode(address(GOERLI_POOLMANAGER)));

        // Deploy the hook using CREATE2
        vm.broadcast();
        KYCHook hook = new KYCHook{salt: salt}(IPoolManager(address(GOERLI_POOLMANAGER)));
        require(address(hook) == hookAddress, "CounterScript: hook address mismatch");

        console.log("Hook deployed in", hookAddress);
    }
}