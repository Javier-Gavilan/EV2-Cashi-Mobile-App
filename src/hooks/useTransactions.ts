import { useEffect, useState } from "react";

import {
    getTransactions,
} from "@/src/storage/transactionStorage";

import { Transaction } from "@/src/types/transaction.types";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadTransactions() {
    try {
      const data = await getTransactions();

      setTransactions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return {
    transactions,
    loading,
    loadTransactions,
  };
}