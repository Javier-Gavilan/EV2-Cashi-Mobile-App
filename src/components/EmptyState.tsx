import {
    StyleSheet,
    Text,
    View,
} from "react-native";

interface EmptyStateProps {
  message: string;
}

export function EmptyState({
  message,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📭</Text>

      <Text style={styles.message}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    fontSize: 48,
    marginBottom: 12,
  },

  message: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});