const { Keypair } = require('@solana/web3.js');

// Генерация нового ключа
const newWallet = Keypair.generate();

// Получение публичного и приватного ключей
const publicKey = newWallet.publicKey.toBase58();
const privateKey = Buffer.from(newWallet.secretKey).toString('hex');

console.log(`Public Key: ${publicKey}`);
console.log(`Private Key: ${privateKey}`);
