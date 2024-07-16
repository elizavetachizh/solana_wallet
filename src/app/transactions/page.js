"use client";
import { useWallet } from "@/context/WalletContext";
import {
  Connection,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL, Keypair,
} from "@solana/web3.js";
import {Button, Box, Typography, TextField, Alert} from "@mui/material";
import { useRouter } from "next/navigation";
import {useState} from "react";
import {log} from "next/dist/server/typescript/utils";

export default function Transactions() {
  const { wallet, balance, setBalance } = useWallet();
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [error, setError] = useState('');
  const connection = new Connection('https://api.devnet.solana.com');
  const router = useRouter();

  const sendTransaction = async () => {
    if (!wallet) {
      setError('Сначала создайте кошелёк');
      return;
    }

    try {
      const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: recipient,
            lamports: amount * LAMPORTS_PER_SOL,
          })
      );

      const signature = await connection.sendTransaction(transaction, [wallet]);
      await connection.confirmTransaction(signature, 'confirmed');

      const walletBalance = await connection.getBalance(wallet.publicKey);
      setBalance(walletBalance / LAMPORTS_PER_SOL);
      setError('');
    } catch (err) {
      setError(`Ошибка при отправке транзакции: ${err.message}`);
    }
  };

  return (
      <Box sx={{ padding: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
          <Button variant="contained" onClick={() => router.push('/wallet')}>
            Назад
          </Button>
          <Typography variant="h6">Баланс: {balance} SOL</Typography>
        </Box>
        {!wallet ? (
            <Box>
              <Alert severity="warning">Сначала создайте кошелёк</Alert>
              <Button variant="contained" onClick={() => router.push('/wallet')}>
                Создать кошелёк
              </Button>
            </Box>
        ) : (
            <Box>
              <TextField
                  fullWidth
                  label="Количество SOL"
                  variant="outlined"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  sx={{ marginBottom: 2 }}
              />
              <TextField
                  fullWidth
                  label="Адрес получателя"
                  variant="outlined"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  sx={{ marginBottom: 2 }}
              />
              {error && (
                  <Alert severity="error" sx={{ marginBottom: 2 }}>
                    {error}
                  </Alert>
              )}
              <Button variant="contained" onClick={sendTransaction}>
                Отправить
              </Button>
            </Box>
        )}
      </Box>
  );
}
