// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {CurrencyLibrary, Currency} from "v4-core/types/Currency.sol";
import {PoolKey} from "v4-core/types/PoolKey.sol";
import {PoolId, PoolIdLibrary} from "v4-core/types/PoolId.sol";
import {IPoolManager} from "v4-core/interfaces/IPoolManager.sol";
import {IHooks} from "v4-core/interfaces/IHooks.sol";

contract PoolFactory {
    using PoolIdLibrary for PoolKey;

    IPoolManager immutable public manager;
    uint256 public counter;
    constructor(IPoolManager _manager) {
        manager = _manager;
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

}