import bitcore from 'bitcore-lib';
import explorers from 'bitcore-explorers';

const privateKeyWIF = 'cReKsiuZewEBoZgPsT2DQ4em3gtrVqVq2Gii9kukkaiWVs5S69HE';

const privateKey = bitcore.PrivateKey.fromWIF(privateKeyWIF);
const address = privateKey.toAddress();

console.log(address.toString());
