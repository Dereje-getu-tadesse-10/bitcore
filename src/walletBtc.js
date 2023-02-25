const bitcore = require('bitcore-lib');
const Mnemonic = require('bitcore-mnemonic');
const mainnet = bitcore.Networks.mainnet;
const testnet = bitcore.Networks.testnet;

/**
 * Génère un nouveau portefeuille de cryptomonnaie pour un réseau donné.
 *
 * @param {Network} network - Le nom du réseau pour lequel créer le portefeuille ("livenet" ou "testnet").
 * @returns {Object} Un objet représentant le portefeuille généré, contenant les propriétés suivantes :
 * - privateKey {string} : La clé privée du portefeuille, sous forme de chaîne de caractères.
 * - address {string} : L'adresse publique du portefeuille, sous forme de chaîne de caractères.
 *
 * @example
 * const newWallet = wallet("testnet");
 * console.log(newWallet.privateKey); // "L9Cv3qW3jKc3fSR1mKPv1m91RwzBJxKQeCxZYzSR9PQfe8M5Lg1m"
 * console.log(newWallet.address); // "n1B5z5KtSX5Z9L9pK1fZG7VfEhJyH7QQf8"
 */

function wallet(network) {
    const privateKey = new bitcore.PrivateKey(network);
    const address = privateKey.toAddress(network);

    return {
        privateKey: privateKey.toString(),
        address: address.toString()
    }
}


/**
 * Génère un nouveau portefeuille de cryptomonnaie hiérarchique déterministe pour un réseau donné.
 *
 * @param {string} network - Le nom du réseau pour lequel créer le portefeuille ("livenet" ou "testnet").
 * @returns {Object} Un objet représentant le portefeuille généré, contenant les propriétés suivantes :
 * - pubKey {string} : La clé publique du portefeuille, sous forme de chaîne de caractères.
 * - privKey {string} : La clé privée du portefeuille, sous forme de chaîne de caractères.
 * - address {string} : L'adresse publique du portefeuille, sous forme de chaîne de caractères.
 * - passPhrase {string} : La phrase de récupération du portefeuille, sous forme de chaîne de caractères.
 *
 * @example
 * const newHDWallet = hdWallet("testnet");
 * console.log(newHDWallet.pubKey); // "xpub661MyMwAqRbcE8QzEuDZK9y2wy9yK3q8s61sJxTnZKpPwMUDmMW8vGLmhnXtv7VUgB6UAK7VUdjR6U1BgQAZrdqu6qK7fruJzDy9SgCJD5"
 * console.log(newHDWallet.privKey); // "xprv9s21ZrQH143K4N5S5nF6GR1J2bwa5x5z4fCJgKbGR5y6F5U33GJCCYpX9UpzRZ6KrCmnwW8QvDh98QMaQSNzwxMgAAkSZhJH9XG1ZUzJx7"
 * console.log(newHDWallet.address); // "mwKsJtSPu8oYMEV9cZ2mkkJsm7TThTtT1V"
 * console.log(newHDWallet.passPhrase); // "idle control tomato slim armed carry danger royal excess kitten video filter"
 */

function hdWallet(network) {
    const passPhrase = new Mnemonic(Mnemonic.Words.ENGLISH);
    const privateKey = passPhrase.toHDPrivateKey(passPhrase.toString(), network);

    return {
        pubKey: privateKey.xpubkey,
        privKey: privateKey.privateKey.toString(),
        address: privateKey.publicKey.toAddress(network).toString(),
        passPhrase: passPhrase.toString()
    }
}


/**
 * Connecte à un portefeuille existant en utilisant une clé privée pour le réseau spécifié.
 *
 * @param {string} network - Le nom du réseau pour lequel créer le portefeuille ("livenet" ou "testnet").
 * @param {string} privateKey - La clé privée du portefeuille, sous forme de chaîne de caractères.
 * @returns {Object} Un objet représentant le portefeuille connecté, contenant les propriétés suivantes :
 * - privateKey {string} : La clé privée du portefeuille, sous forme de chaîne de caractères.
 * - address {string} : L'adresse publique du portefeuille, sous forme de chaîne de caractères.
 *
 * @example
 * const existingWallet = connectWallet("testnet", "L9Cv3qW3jKc3fSR1mKPv1m91RwzBJxKQeCxZYzSR9PQfe8M5Lg1m");
 * console.log(existingWallet.privateKey); // "L9Cv3qW3jKc3fSR1mKPv1m91RwzBJxKQeCxZYzSR9PQfe8M5Lg1m"
 * console.log(existingWallet.address); // "n1B5z5KtSX5Z9L9pK1fZG7VfEhJyH7QQf8"
 */

function connectWallet(network, privateKey) {
    const privKey = new bitcore.PrivateKey(privateKey, network);
    const address = privKey.toAddress(network);

    return {
        privateKey: privKey.toString(),
        address: address.toString()
    }
}

/**
 * Récupère le solde d'une adresse de portefeuille de cryptomonnaie à partir d'un API tiers.
 *
 * @param {string} address - L'adresse publique du portefeuille, sous forme de chaîne de caractères.
 * @returns {Promise<number>} Une promesse résolue avec le solde du portefeuille, en satoshis (1 BTC = 100 000 000 satoshis).
 *
 * @example
 * getBalance("n1B5z5KtSX5Z9L9pK1fZG7VfEhJyH7QQf8")
 *   .then(balance => console.log(balance)); // 1000000
 */

function getBalance(address) {
    const url = `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/balance`;
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.balance

        });
}

