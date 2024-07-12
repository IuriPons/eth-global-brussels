// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import {Vm} from "forge-std/Test.sol";
import "forge-std/console.sol";

import {Currency, CurrencyLibrary} from "v4-core/types/Currency.sol";
import {IPoolManager} from "v4-core/interfaces/IPoolManager.sol";
import {IHooks} from "v4-core/interfaces/IHooks.sol";
import {PoolKey} from "v4-core/types/PoolKey.sol";
import {PoolId, PoolIdLibrary} from "v4-core/types/PoolId.sol";
import {Deployers} from "@uniswap/v4-core/test/utils/Deployers.sol";
// import {Hooks} from "v4-core/libraries/Hooks.sol";
// import {HookMiner} from "../script/utils/HookMiner.sol";

// import {Hook} from "../src/Hook.sol";


contract CreatePoolScriptWithHook is Script, Deployers {
    // using CurrencyLibrary for Currency;
    // using PoolIdLibrary for PoolKey;

    // Hook hook;

    function run() external {
        console.log("hey");
        // Deploy v4-core
        // deployFreshManagerAndRouters();

        // (currency0, currency1) = deployMintAndApprove2Currencies();

    }

}