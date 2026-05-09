import { useEffect, useState } from "react";

import { transactionSchema } from "@/src/schemas/transaction.schema";

import {
    getTransactionById,
} from "@/src/storage/transactionStorage";

import { useTransactions } from "@/src/hooks/useTransactions";

import {
    TransactionType,
} from "@/src/types/transaction.types";

interface UseTransactionFormProps {
    id: string;
    onSuccess: () => void;
}

export function useTransactionForm({
    id,
    onSuccess,
}: UseTransactionFormProps) {
    const isEditing = id !== "new";

    const {
        addTransaction,
        editTransaction,
    } = useTransactions();

    const [amount, setAmount] = useState("");

    const [type, setType] =
        useState<TransactionType>("expense");

    const [description, setDescription] =
        useState("");

    const [categoryId, setCategoryId] =
        useState("");

    const [error, setError] = useState("");

    async function loadTransaction() {
        if (!isEditing) return;

        const transaction =
            await getTransactionById(id);

        if (transaction) {
            setAmount(transaction.amount.toString());

            setType(transaction.type);

            setDescription(
                transaction.description
            );

            setCategoryId(transaction.categoryId);
        }
    }

    useEffect(() => {
        loadTransaction();
    }, []);

    async function handleSubmit() {
        const parsedAmount = Number(amount);

        const result = transactionSchema.safeParse({
            amount: parsedAmount,
            type,
            description,
            categoryId,
        });

        if (!result.success) {
            setError(
                result.error.issues[0].message
            );

            return;
        }

        setError("");

        const transactionData = {
            amount: parsedAmount,
            type,
            description,
            categoryId,
        };

        if (isEditing) {
            await editTransaction(
                id,
                transactionData
            );
        } else {
            await addTransaction(
                transactionData
            );
        }
        onSuccess();
    }
    return {
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
    };
}