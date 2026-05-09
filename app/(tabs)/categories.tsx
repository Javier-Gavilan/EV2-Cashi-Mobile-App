import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";

import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { useCallback } from "react";

import { useCategories } from "@/src/hooks/useCategories";

export default function CategoriesScreen() {
    const router = useRouter();

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

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.addButton}
                onPress={() =>
                    router.push({
                        pathname: "/(tabs)/category/[id]",
                        params: { id: "new" },
                    })
                }
            >
                <Text style={styles.addButtonText}>
                    Nueva Categoría
                </Text>
            </Pressable>

            <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                    <Text>
                        No hay categorías registradas
                    </Text>
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
                                        pathname: "/(tabs)/category/[id]",
                                        params: { id: item.id },
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
                                    removeCategory(item.id)
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
        </View>
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

    card: {
        padding: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 12,
    },

    name: {
        fontSize: 18,
        marginBottom: 12,
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