const { testnet, mainnet } = require("bitcore-lib/lib/networks");
const { createWallet, createHDWallet } = require("./walletBtc");
const checkIncomingBTCTransactions = require("./sendBtc");

const newWallet = createWallet(testnet);
const addressToWatch = newWallet.address;

// param 1 : prix en euro
// param 2 : adresse à surveiller

//checkIncomingBTCTransactions(70, addressToWatch);



