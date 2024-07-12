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
import {Hooks} from "v4-core/libraries/Hooks.sol";
import {HookMiner} from "../script/utils/HookMiner.sol";

import {Hook} from "../src/Hook.sol";


contract CreatePoolScriptWithHook is Script, Deployers {
    using CurrencyLibrary for Currency;
    using PoolIdLibrary for PoolKey;

    Hook hook;

    function run() external {
        // Deploy v4-core
        deployFreshManagerAndRouters();

        (currency0, currency1) = deployMintAndApprove2Currencies();

        address hookAddress = address(
            uint160(
                Hooks.BEFORE_SWAP_FLAG   
            )
        );

        // Set gas price = 10 gwei and deploy our hook
        vm.txGasPrice(10 gwei);
        // deployCode("Hook", abi.encode(manager), hookAddress);
        deployHook();
        hook = Hook(hookAddress);

         // Initialize a pool
        (key, ) = initPool(
            currency0,
            currency1,
            hook,
            300, // Set the `DYNAMIC_FEE_FLAG` in place of specifying a fixed fee
            SQRT_PRICE_1_1,
            ZERO_BYTES
        );

        // Add some liquidity
        modifyLiquidityRouter.modifyLiquidity(
            key,
            IPoolManager.ModifyLiquidityParams({
                tickLower: -60,
                tickUpper: 60,
                liquidityDelta: 100 ether,
                salt: bytes32(0)
            }),
            ZERO_BYTES
        );

    }

    function deployHook() internal {

          uint160 flags = uint160(
            Hooks.BEFORE_SWAP_FLAG 
        );

        // Mine a salt that will produce a hook address with the correct flags
        (address hookAddress, bytes32 salt) =
            HookMiner.find(address(this), flags, type(Hook).creationCode, abi.encode(address(manager)));

        // Deploy the hook using CREATE2
        // vm.broadcast();
        Hook _hook = new Hook{salt: salt}(IPoolManager(address(manager)));
        require(address(_hook) == hookAddress, "hook address mismatch");
    }
}