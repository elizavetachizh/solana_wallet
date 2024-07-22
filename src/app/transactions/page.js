"use client";
import { useWallet } from "@/context/WalletContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const Transactions = () => {
  const { wallet, balance } = useWallet();
  const [amount, setAmount] = useState("");
  const [recipientPublicKey, setRecipientPublicKey] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  console.log(wallet);
  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed",
  );
  const publicKey = new PublicKey(recipientPublicKey);
  const handleTopUp = async () => {
    try {
      const airdropSignature = await connection.requestAirdrop(
        publicKey,
        2 * LAMPORTS_PER_SOL,
      );
      await connection.confirmTransaction(airdropSignature);
      console.log("Airdrop successful");
    } catch (error) {
      console.error("Airdrop failed:", error);
    }
    // try {
    //   const response = await fetch('/api/topup', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       publicKey: recipientPublicKey,
    //       amount,
    //     }),
    //   });
    //
    //   const data = await response.json();
    //   if (response.ok) {
    //     setMessage(`Successfully topped up ${amount} SOL to ${recipientPublicKey}`);
    //   } else {
    //     setMessage(`Error: ${data.error} Details: ${data.details}`);
    //   }
    // } catch (error) {
    //   console.error('Error topping up:', error);
    //   setMessage('Error occurred while topping up');
    // }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <Button variant="contained" onClick={() => router.push("/")}>
          Назад
        </Button>
        <Typography variant="h6">Баланс: {balance} SOL</Typography>
      </Box>
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
          value={recipientPublicKey}
          onChange={(e) => setRecipientPublicKey(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" onClick={handleTopUp}>
          Пополнить
        </Button>
      </Box>
      {message && <p>{message}</p>}
    </Box>
  );
};

export default Transactions;
