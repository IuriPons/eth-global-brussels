// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import {Vm} from "forge-std/Test.sol";
import "forge-std/console.sol";

import {MockERC20} from "../src/MockERC20.sol";

contract DeployToken is Script {
    function run() external {
        vm.startBroadcast();

        // First, we need to deploy a token for the faucet
        console.log("Deploying the token...");
        MockERC20 currency0 = new MockERC20();
        MockERC20 currency1 = new MockERC20();
        console.log("Currency0 deployed ", address(currency0));
        console.log("Currency1 deployed ", address(currency1));

        currency0.mint(msg.sender, 100000000);
        console.log("Balance user currency0:",currency0.balanceOf(msg.sender));
        currency1.mint(msg.sender, 100000000);
        console.log("Balance user currency1:",currency0.balanceOf(msg.sender));
        vm.stopBroadcast();
    }
}