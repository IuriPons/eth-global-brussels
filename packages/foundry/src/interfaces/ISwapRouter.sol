// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import {IPoolManager} from "v4-core/interfaces/IPoolManager.sol";
import {PoolKey} from "v4-core/types/PoolKey.sol";


import {BalanceDelta} from "v4-core/types/BalanceDelta.sol";
import {PoolSwapTest} from "v4-core/test/PoolSwapTest.sol";

interface ISwapRouter {
    function swap(
        PoolKey memory key,
        IPoolManager.SwapParams memory params,
        PoolSwapTest.TestSettings memory testSettings,
        bytes memory hookData
    ) external payable returns (BalanceDelta delta);
}