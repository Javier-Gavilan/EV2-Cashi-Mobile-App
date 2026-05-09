import { useEffect, useState } from "react";

import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/src/storage/categoryStorage";

import { Category } from "@/src/types/category.types";

import { getTransactions } from "@/src/storage/transactionStorage";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadCategories() {
    try {
      const data = await getCategories();

      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function addCategory(name: string) {
    await createCategory(name);

    await loadCategories();
  }

  async function editCategory(
    id: string,
    name: string
  ) {
    await updateCategory(id, name);

    await loadCategories();
  }

  async function removeCategory(id: string) {
    const transactions =
      await getTransactions();

    const categoryHasTransactions =
      transactions.some(
        (transaction) =>
          transaction.categoryId === id
      );

    if (categoryHasTransactions) {
      throw new Error(
        "No puedes eliminar una categoría asociada a una transacción existente"
      );
    }
    await deleteCategory(id);

    await loadCategories();
  }

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    loading,
    addCategory,
    editCategory,
    removeCategory,
    loadCategories,
  };
}