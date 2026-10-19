import { Metadata } from "next";
import { WalletClient } from "./WalletClient";

export const metadata: Metadata = {
  title: "Personal Wallet — Tadikonda Sai Manikanta",
  description: "A private space for my personal information and important documents.",
};

export default function WalletPage() {
  return <WalletClient />;
}