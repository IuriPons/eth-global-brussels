// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/console.sol";

import {CurrencyLibrary, Currency} from "v4-core/types/Currency.sol";
import {PoolKey} from "v4-core/types/PoolKey.sol";
import {PoolId, PoolIdLibrary} from "v4-core/types/PoolId.sol";
import {IPoolManager} from "v4-core/interfaces/IPoolManager.sol";
import {IHooks} from "v4-core/interfaces/IHooks.sol";

import {PoolSwapTest} from "v4-core/test/PoolSwapTest.sol";
import {BalanceDelta} from "v4-core/types/BalanceDelta.sol";

import {TickMath} from "v4-core/libraries/TickMath.sol";

contract PoolFactory {
    using PoolIdLibrary for PoolKey;

    IPoolManager immutable public manager;
    
    uint256 public countPools;
    PoolKey[] public pools;
    mapping(bytes32 poolId => PoolKey pool) public poolInfos;
    mapping(address owner => PoolKey[] pools) public poolsByOwner;

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
        (Currency token0, Currency token1) = _currency0 < _currency1 ? (_currency0, _currency1) : (_currency1, _currency0);
        _key = PoolKey(_currency0, _currency1, fee, 60, hooks);
        manager.initialize(_key, sqrtPriceX96, initData); 
        countPools = countPools + 1;
        bytes32 poolId = getPoolId(Currency.unwrap(token0), Currency.unwrap(token1));
        poolInfos[poolId] =  _key;
        console.logBytes32(poolId);
        pools.push(_key);
        poolsByOwner[msg.sender].push(_key);
    }

    function getPoolId(address currency0, address currency1) internal returns(bytes32) {
        (address token0, address token1) = currency0 < currency1 ? (currency0, currency1) : (currency1, currency0);
        return keccak256(abi.encodePacked(currency0, currency1));
    }

    function getPools() public view returns(PoolKey[] memory) {
        return pools;
    }

}