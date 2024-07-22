import { exec } from 'child_process';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { publicKey, amount } = await req.json();

        if (!publicKey || !amount) {
            return new NextResponse(JSON.stringify({ error: 'Public key and amount are required' }), { status: 400 });
        }

        // Выполнение команды Solana CLI для пополнения средств
        return new Promise((resolve) => {
            exec(`solana airdrop ${amount} ${publicKey}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing solana airdrop: ${stderr}`);
                    resolve(new NextResponse(JSON.stringify({ error: 'Failed to top up', details: stderr }), { status: 500 }));
                } else {
                    console.log(`Airdrop successful: ${stdout}`);
                    resolve(new NextResponse(JSON.stringify({ message: 'Top up successful', output: stdout }), { status: 200 }));
                }
            });
        });
    } catch (error) {
        console.error('Error occurred while processing request:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}
