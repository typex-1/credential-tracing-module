/*
author:rujia
website:www.rujia.uk
version:1.0
*/

const HDWalletProvider = require("truffle-hdwallet-provider");

// add your mnemonic here
const MNEMONIC = "mnemonic"

module.exports = {
  networks: {
    oasis: {
      provider: function () {
        return new HDWalletProvider(MNEMONIC, "https://web3.oasiscloud.io");
      },
      network_id: "42261",
      gasPrice: "0x3b9aca00"
    }
  },
  compilers: {
    external: {
      command: "./node_modules/.bin/oasis-compile",
      targets: [{
        path: "./.oasis-build/*.json",
      }]
    }
  }
};
