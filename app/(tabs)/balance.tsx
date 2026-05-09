import { useCallback } from "react";

import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { useTransactions } from "@/src/hooks/useTransactions";

export default function BalanceScreen() {
  const {
    totalIncome,
    totalExpense,
    balance,
    loadTransactions,
  } = useTransactions();

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Resumen Financiero
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          Total Ingresos
        </Text>

        <Text style={styles.income}>
          ${totalIncome}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Total Egresos
        </Text>

        <Text style={styles.expense}>
          ${totalExpense}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Balance Final
        </Text>

        <Text
          style={[
            styles.balance,
            balance >= 0
              ? styles.positive
              : styles.negative,
          ]}
        >
          ${balance}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
  },

  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    backgroundColor: "#fff",
  },

  label: {
    fontSize: 18,
    marginBottom: 8,
  },

  income: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#22c55e",
  },

  expense: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ef4444",
  },

  balance: {
    fontSize: 32,
    fontWeight: "bold",
  },

  positive: {
    color: "#22c55e",
  },

  negative: {
    color: "#ef4444",
  },
});