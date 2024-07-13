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
import {PoolSwapTest} from "v4-core/test/PoolSwapTest.sol";
import {TickMath} from "v4-core/libraries/TickMath.sol";
interface ISwapRouter {
    function swap(
        PoolKey memory key,
        IPoolManager.SwapParams memory params,
        PoolSwapTest.TestSettings memory testSettings,
        bytes memory hookData
    ) external payable returns (BalanceDelta delta);
}


contract SwapScript is Script {
    using CurrencyLibrary for Currency;
    using PoolIdLibrary for PoolKey;

    PoolFactory constant poolFactory = PoolFactory(0xB7c61e6987144bC0E692E6Bde2B845B9e29D4cD9);
    ISwapRouter constant public swapRouter = ISwapRouter(0xc993301287f7E7f7C0EB28c4616534CcAbA348BA);
    
    address constant public TOKEN_0 = 0x5416adf327242B7224413Dcd6E454FfcB5C1e73C;
    address constant public TOKEN_1 = 0x73c1A1437920ECFEC6Ac079d717CB75c0B0e9086;

    function run() external {
        vm.startBroadcast();

        address token0 = uint160(TOKEN_0) < uint160(TOKEN_1) ? TOKEN_0 : TOKEN_1;
        address token1 = uint160(TOKEN_0) < uint160(TOKEN_1) ? TOKEN_1 : TOKEN_0;

        vm.txGasPrice(10 gwei);


        uint24 swapFee = 4000;
        int24 tickSpacing = 10;

        // Using a hooked pool
        PoolKey memory pool = PoolKey({
            currency0: Currency.wrap(token0),
            currency1: Currency.wrap(token1),
            fee: 300,
            tickSpacing: 60,
            hooks: IHooks(address(0))
        });

        // approve tokens to the swap router
        IERC20(token0).approve(address(swapRouter), type(uint256).max);
        IERC20(token1).approve(address(swapRouter), type(uint256).max);

        // ---------------------------- //
        // Swap 100e18 token0 into token1 //
        // ---------------------------- //
        bool zeroForOne = true;
        IPoolManager.SwapParams memory params = IPoolManager.SwapParams({
            zeroForOne: zeroForOne,
            amountSpecified: 20 ether,
            sqrtPriceLimitX96: zeroForOne ? TickMath.MIN_SQRT_PRICE + 1 : TickMath.MAX_SQRT_PRICE // unlimited impact
        });

        // in v4, users have the option to receieve native ERC20s or wrapped ERC1155 tokens
        // here, we'll take the ERC20s
        PoolSwapTest.TestSettings memory testSettings =
            PoolSwapTest.TestSettings({takeClaims: false, settleUsingBurn: false});

        bytes memory hookData = new bytes(0);
        swapRouter.swap(pool, params, testSettings, hookData);

        vm.stopBroadcast();
        
    }
}