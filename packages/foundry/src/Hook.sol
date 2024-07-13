// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {BaseHook} from "v4-periphery/BaseHook.sol";

import {CurrencyLibrary, Currency} from "v4-core/types/Currency.sol";
import {PoolKey} from "v4-core/types/PoolKey.sol";
import {BalanceDeltaLibrary, BalanceDelta} from "v4-core/types/BalanceDelta.sol";
import {BeforeSwapDelta, toBeforeSwapDelta} from "v4-core/types/BeforeSwapDelta.sol";

import {IPoolManager} from "v4-core/interfaces/IPoolManager.sol";

import {Hooks} from "v4-core/libraries/Hooks.sol";

import {VerifyUsers} from "./VerifyUsers.sol";

contract Hook is BaseHook {
    using CurrencyLibrary for Currency;
    using BalanceDeltaLibrary for BalanceDelta;

    error KYCNotVerifiedUnsupportedAmount();

    VerifyUsers immutable public verifyUsersContract = VerifyUsers(address(0)); // change address 
    int256 constant public MAX_AMOUNT_WITHOUT_KYC = 1000; // change address 

    constructor(
        IPoolManager _manager
    ) BaseHook(_manager) {}

    function getHookPermissions()
        public
        pure
        override
        returns (Hooks.Permissions memory)
    {
        return
            Hooks.Permissions({
                beforeInitialize: false,
                afterInitialize: false,
                beforeAddLiquidity: false,
                beforeRemoveLiquidity: false,
                afterAddLiquidity: false,
                afterRemoveLiquidity: false,
                beforeSwap: true,
                afterSwap: false,
                beforeDonate: false,
                afterDonate: false,
                beforeSwapReturnDelta: false,
                afterSwapReturnDelta: false,
                afterAddLiquidityReturnDelta: false,
                afterRemoveLiquidityReturnDelta: false
            });
    }

     function beforeSwap(
        address,
        PoolKey calldata key,
        IPoolManager.SwapParams calldata swapParams,
        bytes calldata hookData
    )
        external
        override
        onlyByManager
        returns (bytes4, BeforeSwapDelta, uint24)
    {
        bool isUserVerified = _verifyUser(hookData);

        int256 amountToSwap = swapParams.amountSpecified;
        if (!isUserVerified) {
            if ( amountToSwap > MAX_AMOUNT_WITHOUT_KYC) {
                revert KYCNotVerifiedUnsupportedAmount();
            } 
        }
        return (this.beforeSwap.selector, toBeforeSwapDelta(0, 0), 0);
    }


    function _verifyUser(bytes calldata hookData) internal returns(bool verified) {
        if (hookData.length == 0) return verified;

        (address swaper) = abi.decode(
            hookData,
            (address)
        );

        return verifyUsersContract.verifiedUsers(swaper);
    }

   

    
}