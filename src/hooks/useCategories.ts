import { useEffect, useState } from "react";

import {
    createCategory,
    deleteCategory,
    getCategories,
    updateCategory,
} from "@/src/storage/categoryStorage";

import { Category } from "@/src/types/category.types";

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