import styles from "./page.module.css";
import { Box, Button } from "@mui/material";
import Link from "next/link";
export default function Home() {
  return (
    <main className={styles.main}>
      <Box
        sx={{
          padding: 2,
          "@media (max-width: 600px)": {
            padding: 1,
          },
        }}
      >
        <h1>Welcome to Solana Wallet</h1>
        <Box
          component="nav"
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: 2,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 1,
          }}
        >
          <Box
            component="ul"
            sx={{
              listStyle: "none",
              display: "flex",
              gap: 2,
              padding: 0,
              margin: 0,
            }}
          >
            <Box component="li">
              <Link legacyBehavior href="/wallet">
                <Button variant="contained" color="primary" component="a">
                  Кошелек
                </Button>
              </Link>
            </Box>
            <Box component="li">
              <Link href="/transactions" legacyBehavior>
                <Button variant="contained" color="secondary" component="a">
                  Транзакции
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </main>
  );
}
