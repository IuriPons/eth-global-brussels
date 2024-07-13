// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;


import "forge-std/Script.sol";

import {Hook} from "../src/Hook.sol";
// import {PoolFactory} from "../src/PoolFactory.sol";
import {Create2} from "../src/Create2.sol";
import {Hooks} from "v4-core/libraries/Hooks.sol";
import {HookMiner} from "../script/utils/HookMiner.sol";
import {IPoolManager} from "v4-core/interfaces/IPoolManager.sol";

contract Deploy is Script {
    address constant CREATE2_DEPLOYER = address(0x4e59b44847b379578588920cA78FbF26c0B4956C);


    function run() external {

        vm.startBroadcast();

        // Create2 create2 = new Create2();
        // bytes memory creationCode = abi.encodePacked(type(Hook).creationCode);

        // address computedAddress = create2.computeAddress("122", keccak256(creationCode));
        // address deployedAddress = create2.deploy(0, "122", creationCode);


        deployHook();
        vm.stopBroadcast();
    
    
    }

    function deployHook() internal {

        uint160 flags = uint160(
            Hooks.BEFORE_SWAP_FLAG 
        );

        // Mine a salt that will produce a hook address with the correct flags
        (address hookAddress, bytes32 salt) =
            HookMiner.find(CREATE2_DEPLOYER, flags, type(Hook).creationCode, abi.encode(address(0)));

        // Deploy the hook using CREATE2
        console.log(hookAddress);
        console.logBytes32(salt);
        
        Hook _hook = new Hook{salt: salt}(IPoolManager(address(0)));
        console.log(address(_hook));
        // require(address(_hook) == hookAddress, "hook address mismatch");
    }
}