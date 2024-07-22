const { Connection, PublicKey, LAMPORTS_PER_SOL } = require('@solana/web3.js');

const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
const publicKey = new PublicKey('8V6QxQmB5Y2qu36Fqi4SyrqanVVWiDHBg2YtWU74wkWP');

(async () => {
    try {
        const balance = await connection.getBalance(publicKey);
        console.log(`Balance: ${balance / LAMPORTS_PER_SOL} SOL`);
    } catch (error) {
        console.error('Failed to get balance:', error);
    }
})();
