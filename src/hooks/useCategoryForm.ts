import { useEffect, useState } from "react";

import { categorySchema } from "@/src/schemas/category.schema";

import {
  getCategoryById,
} from "@/src/storage/categoryStorage";

import { useCategories } from "@/src/hooks/useCategories";

interface UseCategoryFormProps {
  id: string;
  onSuccess: () => void;
}

export function useCategoryForm({
  id,
  onSuccess,
}: UseCategoryFormProps) {
  const isEditing = id !== "new";

  const {
    addCategory,
    editCategory,
  } = useCategories();

  const [name, setName] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  async function loadCategory() {
    if (!isEditing) return;

    try {
      setLoading(true);

      const category = await getCategoryById(id);

      if (category) {
        setName(category.name);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategory();
  }, []);

  async function handleSubmit() {
    const result = categorySchema.safeParse({
      name,
    });

    if (!result.success) {
      setError(
        result.error.issues[0].message
      );

      return;
    }

    setError("");

    if (isEditing) {
      await editCategory(id, name);
    } else {
      await addCategory(name);
    }

    onSuccess();
  }

  return {
    name,
    setName,
    error,
    loading,
    isEditing,
    handleSubmit,
  };
}