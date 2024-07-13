// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import {IPoolManager} from "v4-core/interfaces/IPoolManager.sol";
// import {PoolManager} from "v4-core/src/PoolManager.sol";
import {IHooks} from "v4-core/interfaces/IHooks.sol";
import {PoolKey} from "v4-core/types/PoolKey.sol";
import {CurrencyLibrary, Currency} from "v4-core/types/Currency.sol";
import {PoolId, PoolIdLibrary} from "v4-core/types/PoolId.sol";

import {PoolFactory} from "../src/PoolFactory.sol";

import {BalanceDelta} from "v4-core/types/BalanceDelta.sol";
import {IERC20} from "forge-std/interfaces/IERC20.sol";


interface IModifyLiquidityProvider {
     function modifyLiquidity(
        PoolKey memory key,
        IPoolManager.ModifyLiquidityParams memory params,
        bytes memory hookData
    ) external returns (BalanceDelta delta);
}
contract CreatePoolScript is Script {
    using CurrencyLibrary for Currency;
    using PoolIdLibrary for PoolKey;

    PoolFactory constant poolFactory = PoolFactory(0xB7c61e6987144bC0E692E6Bde2B845B9e29D4cD9);
    IModifyLiquidityProvider constant public liquidityProvider = IModifyLiquidityProvider(0xB7b8FF73bc1b41feF618f43dfe063f42753470f1);
    
    address constant public TOKEN_0 = 0x5416adf327242B7224413Dcd6E454FfcB5C1e73C;
    address constant public TOKEN_1 = 0x73c1A1437920ECFEC6Ac079d717CB75c0B0e9086;

    function run() external {
        vm.startBroadcast();

        address token0 = uint160(TOKEN_0) < uint160(TOKEN_1) ? TOKEN_0 : TOKEN_1;
        address token1 = uint160(TOKEN_0) < uint160(TOKEN_1) ? TOKEN_1 : TOKEN_0;

        Currency currency0 = Currency.wrap(token0);
        Currency currency1 =  Currency.wrap(token1);
        // Currency currency3 =  Currency.wrap(address(2));
        IHooks hook = IHooks(address(0));

        // address manager = address(poolFactory.manager());
        console.log(address(poolFactory).code.length);

        vm.txGasPrice(10 gwei);

        (PoolKey memory _key, PoolId _id) = poolFactory.initPool{gas: 3000000}(currency0,currency1, IHooks(0x0000000000000000000000000000000000000000), 300, 79228162514264337593543950336, "0x00");
        
        uint256 value = poolFactory.counter();

        console.log("Number of pools:", value);

        // add liquidity
        bytes memory hookData = new bytes(0);

        IERC20(token0).approve(address(liquidityProvider), type(uint256).max);
        
        IERC20(token1).approve(address(liquidityProvider), type(uint256).max);

        liquidityProvider.modifyLiquidity(_key, IPoolManager.ModifyLiquidityParams(-600, 600, 10000, 0), hookData);

        // (PoolKey memory _key2, PoolId _id2) = poolFactory.initPool(currency0,currency3, IHooks(0x0000000000000000000000000000000000000000), 300, 79228162514264337593543950336, "0x00");


        // uint256 value2 = poolFactory.counter();

        // console.log("PoolFee:", _key.fee);
        // console.log("Number of pools:", value2);
        // PoolId id = bytes32(_key.toId());

        vm.stopBroadcast();
        
    }
}