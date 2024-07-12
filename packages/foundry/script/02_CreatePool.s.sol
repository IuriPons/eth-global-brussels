// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "forge-std/console.sol";
// import {IPoolManager} from "v4-core/src/interfaces/IPoolManager.sol";
// import {PoolManager} from "v4-core/src/PoolManager.sol";
import {IHooks} from "v4-core/interfaces/IHooks.sol";
import {PoolKey} from "v4-core/types/PoolKey.sol";
import {CurrencyLibrary, Currency} from "v4-core/types/Currency.sol";
import {PoolId, PoolIdLibrary} from "v4-core/types/PoolId.sol";

import {PoolFactory} from "../src/PoolFactory.sol";
contract CreatePoolScript is Script {
    using CurrencyLibrary for Currency;
    using PoolIdLibrary for PoolKey;

    
    

    

    PoolFactory constant poolFactory = PoolFactory(0x9848e4470F89bec8b050eCDf93F69B8660B6046C);
    function run() external {
        vm.startBroadcast();

        Currency currency0 = Currency.wrap(address(0));
        Currency currency1 =  Currency.wrap(address(1));
        IHooks hook = IHooks(address(0));

        // address manager = address(poolFactory.manager());
        console.log(address(poolFactory).code.length);

        // (PoolKey memory _key, PoolId _id) = poolFactory.initPool(currency0,currency1, IHooks(0x0000000000000000000000000000000000000000), 2, 79228162514264337593543950336, "0x00");
        
        // console.log("Poolkey:", _key.fee);
        // PoolId id = bytes32(_key.toId());

        vm.stopBroadcast();
        
    }
}