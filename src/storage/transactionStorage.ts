import AsyncStorage from "@react-native-async-storage/async-storage";

import { STORAGE_KEYS } from "@/src/constants/storageKeys";
import { Transaction } from "@/src/types/transaction.types";

export async function getTransactions(): Promise<Transaction[]> {
  const data = await AsyncStorage.getItem(
    STORAGE_KEYS.TRANSACTIONS
  );

  return data ? JSON.parse(data) : [];
}

export async function saveTransactions(
  transactions: Transaction[]
): Promise<void> {
  await AsyncStorage.setItem(
    STORAGE_KEYS.TRANSACTIONS,
    JSON.stringify(transactions)
  );
}