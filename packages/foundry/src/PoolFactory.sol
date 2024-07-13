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
    uint256 public counter;
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
        _key = PoolKey(_currency0, _currency1, fee, 60, hooks);
        id = _key.toId();
        manager.initialize(_key, sqrtPriceX96, initData);
        counter = counter +1;
    }

    function swap(
        address currency0,
        address currency1,
        uint24 swapFee,
        int24 tickSpacing,
        bool zeroForOne,
        int256 amount,
        PoolSwapTest.TestSettings memory testSettings,
        bytes memory hookData
    ) external payable returns (BalanceDelta delta) {

        PoolKey memory pool = PoolKey({
            currency0: Currency.wrap(currency0),
            currency1: Currency.wrap(currency1),
            fee: swapFee,
            tickSpacing: tickSpacing,
            hooks: IHooks(address(0))
        });

        IPoolManager.SwapParams memory params = IPoolManager.SwapParams({
            zeroForOne: zeroForOne,
            amountSpecified: amount,
            sqrtPriceLimitX96: TickMath.MAX_SQRT_PRICE - 1 // unlimited impact
        });

        PoolSwapTest.TestSettings memory testSettings = PoolSwapTest.TestSettings({takeClaims: false, settleUsingBurn: false});

        bytes memory hookData = new bytes(0);
        swapRouter.swap(pool, params, testSettings, hookData);

    }

}