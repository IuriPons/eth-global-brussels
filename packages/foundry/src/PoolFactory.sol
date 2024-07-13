// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {CurrencyLibrary, Currency} from "v4-core/types/Currency.sol";
import {PoolKey} from "v4-core/types/PoolKey.sol";
import {PoolId, PoolIdLibrary} from "v4-core/types/PoolId.sol";
import {IPoolManager} from "v4-core/interfaces/IPoolManager.sol";
import {IHooks} from "v4-core/interfaces/IHooks.sol";

import {PoolSwapTest} from "v4-core/test/PoolSwapTest.sol";
import {BalanceDelta} from "v4-core/types/BalanceDelta.sol";

import {TickMath} from "v4-core/libraries/TickMath.sol";

interface ISwapRouter {
    function swap(
        PoolKey memory key,
        IPoolManager.SwapParams memory params,
        PoolSwapTest.TestSettings memory testSettings,
        bytes memory hookData
    ) external payable returns (BalanceDelta delta);
}

contract PoolFactory {
    using PoolIdLibrary for PoolKey;

    IPoolManager immutable public manager;
    ISwapRouter immutable public swapRouter;
    uint256 public countPools;

    mapping(bytes32 poolId => PoolKey pool) public poolInfos;

    constructor(IPoolManager _manager, address _swapRouter) {
        manager = _manager;
        swapRouter = ISwapRouter(_swapRouter);
    }

    function initPool(
        Currency _currency0,
        Currency _currency1,
        IHooks hooks,
        uint24 fee,
        uint160 sqrtPriceX96,
        bytes memory initData
    ) external returns (PoolKey memory _key, PoolId id) {
        (Currency token0, Currency token1) = _currency0 < _currency1 ? (_currency0, _currency1) : (_currency1, _currency0);
        _key = PoolKey(_currency0, _currency1, fee, 60, hooks);
        manager.initialize(_key, sqrtPriceX96, initData); 
        countPools = countPools + 1;
        bytes32 poolId = getPoolId(currency0, currency1);
        poolInfos[poolId] =  _key;
    }

    function getPoolId(address currency0, address currency1) internal returns(bytes32) {
        (address token0, address token1) = _currency0 < _currency1 ? (_currency0, _currency1) : (_currency1, _currency0);
        return keccak256(abi.encodePacked(currency0, currency1));
    }

    function swap(
        address currency0,
        address currency1,
        int256 amount
    ) external payable returns (BalanceDelta delta) {

        bool zeroForOne;
        bytes32 poolId = getPoolId(currency0, currency1);

        PoolKey memory pool = poolInfos[poolId];

        zeroForOne = currency0 == pool.currency0;

        IPoolManager.SwapParams memory params = IPoolManager.SwapParams({
            zeroForOne: zeroForOne,
            amountSpecified: zeroForOne ? amount : -amount,
            sqrtPriceLimitX96: TickMath.MAX_SQRT_PRICE - 1 // unlimited impact
        });

        PoolSwapTest.TestSettings memory testSettings = PoolSwapTest.TestSettings({takeClaims: false, settleUsingBurn: false});

        bytes memory hookData = new bytes(0);
        swapRouter.swap(pool, params, testSettings, hookData);

    }

}