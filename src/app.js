const { testnet, mainnet } = require("bitcore-lib/lib/networks");
const { wallet, hdWallet } = require("./walletBtc");

const createWallet = wallet(testnet);

console.log(createWallet);

