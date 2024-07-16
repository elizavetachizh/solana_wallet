import {createContext, useContext, useEffect, useState} from "react";
import {Keypair} from "@solana/web3.js";

// Функция для загрузки кошелька из localStorage
const loadWalletFromLocalStorage = () => {
  const walletData = localStorage.getItem('wallet');
  if (walletData) {
    const parsedData = JSON.parse(walletData);
    const secretKey = Uint8Array.from(parsedData.secretKey);
    return Keypair.fromSecretKey(secretKey);
  }
  return null;
};

// Функция для сохранения кошелька в localStorage
const saveWalletToLocalStorage = (wallet) => {
  const secretKey = wallet.secretKey;
  localStorage.setItem('wallet', JSON.stringify({ secretKey: Array.from(secretKey) }));
};

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(loadWalletFromLocalStorage());
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (wallet) {
      saveWalletToLocalStorage(wallet);
    }
  }, [wallet]);

  return (
      <WalletContext.Provider value={{ wallet, setWallet, balance, setBalance }}>
        {children}
      </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
