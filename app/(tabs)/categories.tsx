import { useFocusEffect } from "@react-navigation/native";

import { useRouter } from "expo-router";

import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  useCallback,
  useState,
} from "react";

import { useCategories } from "@/src/hooks/useCategories";

import { EmptyState } from "@/src/components/EmptyState";

export default function CategoriesScreen() {
  const router = useRouter();

  const [error, setError] = useState("");

  const {
    categories,
    removeCategory,
    loadCategories,
  } = useCategories();

  useFocusEffect(
    useCallback(() => {
      loadCategories();
    }, [])
  );

  async function handleDeleteCategory(
    id: string
  ) {
    try {
      setError("");

      await removeCategory(id);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={styles.addButton}
        onPress={() =>
          router.push({
            pathname: "/category/[id]",
            params: { id: "new" },
          })
        }
      >
        <Text style={styles.addButtonText}>
          Nueva Categoría
        </Text>
      </Pressable>

      {error !== "" && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <EmptyState
            message="No hay categorías registradas"
          />
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>
              {item.name}
            </Text>

            <View style={styles.actions}>
              <Pressable
                style={styles.editButton}
                onPress={() =>
                  router.push({
                    pathname:
                      "/category/[id]",
                    params: {
                      id: item.id,
                    },
                  })
                }
              >
                <Text style={styles.buttonText}>
                  Editar
                </Text>
              </Pressable>

              <Pressable
                style={styles.deleteButton}
                onPress={() =>
                  handleDeleteCategory(item.id)
                }
              >
                <Text style={styles.buttonText}>
                  Eliminar
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  addButton: {
    backgroundColor: "#22c55e",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  error: {
    color: "#ef4444",
    marginBottom: 12,
    textAlign: "center",
  },

  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
  },

  name: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: "bold",
  },

  actions: {
    flexDirection: "row",
    gap: 10,
  },

  editButton: {
    backgroundColor: "#3b82f6",
    padding: 10,
    borderRadius: 6,
  },

  deleteButton: {
    backgroundColor: "#ef4444",
    padding: 10,
    borderRadius: 6,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});