const axios = require('axios');

async function checkIncomingBTCTransactions(priceEuro, addressToWatch) {
    try {
        console.log(`Le prix de l'objet est de ${priceEuro} euros.`);

        console.log(`l'adresse à surveiller est : ${addressToWatch}`);

        const satoshis = priceEuro * 100000000;

        const response = await axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${addressToWatch}/full`);

        const transactions = response.data.txs;

        console.log(`Il y a ${transactions.length} nouvelles transactions pour l'adresse ${addressToWatch}.`);

        for (const transaction of transactions) {

            const totalSatoshis = transaction.outputs.reduce((total, output) => total + output.value, 0);

            console.log(`La transaction ${transaction.hash} a un montant de ${totalSatoshis} satoshis.`);

            if (totalSatoshis >= satoshis) {

                console.log("Le paiement a été effectué avec succès !");

            } else {

                console.log("Le paiement a échoué.");

            }
        }
    } catch (error) {

        console.error(`Une erreur s'est produite lors de la vérification des nouvelles transactions entrantes pour l'adresse ${addressToWatch}:`, error);

    }
}

module.exports = checkIncomingBTCTransactions;

