import {createContext, useContext, useState} from "react";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(0);

  return (
      <WalletContext.Provider value={{ wallet, setWallet, balance, setBalance }}>
        {children}
      </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
