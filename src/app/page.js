import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
      <div>
        <h1>Welcome to Solana Wallet</h1>
        <nav>
          <ul>
            <li>
              <Link legacyBehavior  href="/wallet">
                <a>Кошелек</a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior href="/transactions">
                <a href={"/transactions"}>Транзакции</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
  );
}
