const bitcore = require('bitcore-lib');
const explorers = require('bitcore-explorers')

function generateNewAddress() {
    // Générer une nouvelle clé privée aléatoire
    const privateKey = new bitcore.PrivateKey();

    // Obtenir l'adresse publique correspondante
    const publicKey = privateKey.toPublicKey();
    const address = publicKey.toAddress();

    // Retourner la clé privée et l'adresse publique
    return { privateKey: privateKey, address: address };
}

console.log(
    ` L'adresse publique : ${generateNewAddress().address.toString()}\n`,
    `La clé privée : ${generateNewAddress().privateKey.toString()} \n`,
    `La clé privée en WIF : ${generateNewAddress().privateKey.toWIF()}`,
);