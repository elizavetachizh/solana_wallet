"use client";
import { useEffect } from "react";
import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useWallet } from "@/context/WalletContext";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
export default function Wallet() {
  const { wallet, setWallet, balance, setBalance } = useWallet();
  const connection = new Connection("https://api.devnet.solana.com");

  const createWallet = async () => {
    const newWallet = Keypair.generate();
    console.log("New Wallet:", newWallet);
    setWallet(newWallet);

    const walletBalance = await connection.getBalance(newWallet.publicKey);
    setBalance(walletBalance / LAMPORTS_PER_SOL);
  };

  useEffect(() => {
    if (wallet) {
      const fetchBalance = async () => {
        const walletBalance = await connection.getBalance(wallet.publicKey);
        console.log(walletBalance)
        setBalance(walletBalance / LAMPORTS_PER_SOL);
      };

      fetchBalance();
    }
  }, [wallet]);
  console.log(wallet)
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Копировано в буфер обмена");
    });
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
        <Button variant="contained" onClick={createWallet}>
          Создать кошелёк
        </Button>
        <Typography variant="h6">Баланс: {balance} SOL</Typography>
      </Box>
      {wallet && (
        <Box>
          <Typography variant="body1">
            Адрес кошелька: {wallet.publicKey.toBase58()}
            <Tooltip title="Копировать адрес">
              <IconButton
                onClick={() => copyToClipboard(wallet.publicKey.toBase58())}
              >
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Typography>
          <Typography variant="body1">
            Private Key: {Buffer.from(wallet.secretKey).toString("hex")}
            <Tooltip title="Копировать ключ">
              <IconButton
                onClick={() =>
                  copyToClipboard(Buffer.from(wallet.secretKey).toString("hex"))
                }
              >
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Typography>
        </Box>
      )}
    </Box>
  );
}
