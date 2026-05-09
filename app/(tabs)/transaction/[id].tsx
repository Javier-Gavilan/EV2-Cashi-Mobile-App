import { useLocalSearchParams, useRouter } from "expo-router";

import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import { useTransactionForm } from "@/src/hooks/useTransactionForm";

import { useCategories } from "@/src/hooks/useCategories";

export default function TransactionFormScreen() {
    const router = useRouter();

    const { id } = useLocalSearchParams<{
        id: string;
    }>();

    const { categories } = useCategories();

    const {
        amount,
        setAmount,

        type,
        setType,

        description,
        setDescription,

        categoryId,
        setCategoryId,

        error,

        isEditing,

        handleSubmit,
    } = useTransactionForm({
        id,
        onSuccess: () => router.back(),
    });

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={
                Platform.OS === "ios"
                    ? "padding"
                    : undefined
            }
        >
            <Text style={styles.title}>
                {isEditing
                    ? "Editar Transacción"
                    : "Nueva Transacción"}
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={description}
                onChangeText={setDescription}
            />

            <TextInput
                style={styles.input}
                placeholder="Monto"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />

            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={type}
                    onValueChange={setType}
                >
                    <Picker.Item
                        label="Egreso"
                        value="expense"
                    />

                    <Picker.Item
                        label="Ingreso"
                        value="income"
                    />
                </Picker>
            </View>

            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={categoryId}
                    onValueChange={setCategoryId}
                >
                    <Picker.Item
                        label="Seleccione categoría"
                        value=""
                    />

                    {categories.map((category) => (
                        <Picker.Item
                            key={category.id}
                            label={category.name}
                            value={category.id}
                        />
                    ))}
                </Picker>
            </View>

            {error !== "" && (
                <Text style={styles.error}>
                    {error}
                </Text>
            )}

            <Pressable
                style={styles.button}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>
                    Guardar
                </Text>
            </Pressable>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
        textAlign: "center",
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        backgroundColor: "#fff",
    },

    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 12,
        overflow: "hidden",
        backgroundColor: "#fff",
    },

    error: {
        color: "red",
        marginBottom: 12,
    },

    button: {
        backgroundColor: "#22c55e",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});