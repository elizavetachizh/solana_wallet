const { Connection, PublicKey, LAMPORTS_PER_SOL } = require('@solana/web3.js');

const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
const publicKey = new PublicKey('43SRaEMqWiuSDQwXEdsUYce3q4VgynsdyzNTfPfeJAi8');

(async () => {
    try {
        const airdropSignature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL);
        await connection.confirmTransaction(airdropSignature);
        console.log('Airdrop successful');
    } catch (error) {
        console.error('Airdrop failed:', error);
    }
})();
