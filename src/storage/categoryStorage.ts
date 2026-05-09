import AsyncStorage from "@react-native-async-storage/async-storage";

import { STORAGE_KEYS } from "@/src/constants/storageKeys";
import { Category } from "@/src/types/category.types";

export async function getCategories(): Promise<Category[]> {
  const data = await AsyncStorage.getItem(
    STORAGE_KEYS.CATEGORIES
  );

  return data ? JSON.parse(data) : [];
}

export async function saveCategories(
  categories: Category[]
): Promise<void> {
  await AsyncStorage.setItem(
    STORAGE_KEYS.CATEGORIES,
    JSON.stringify(categories)
  );
}

export async function createCategory(
  name: string
): Promise<Category> {
  const categories = await getCategories();

  const newCategory: Category = {
    id: Date.now().toString(),
    name,
  };

  const updatedCategories = [
    ...categories,
    newCategory,
  ];

  await saveCategories(updatedCategories);

  return newCategory;
}

export async function updateCategory(
  id: string,
  name: string
): Promise<void> {
  const categories = await getCategories();

  const updatedCategories = categories.map((category) =>
    category.id === id
      ? {
          ...category,
          name,
        }
      : category
  );

  await saveCategories(updatedCategories);
}

export async function deleteCategory(
  id: string
): Promise<void> {
  const categories = await getCategories();

  const updatedCategories = categories.filter(
    (category) => category.id !== id
  );

  await saveCategories(updatedCategories);
}

export async function getCategoryById(
  id: string
): Promise<Category | undefined> {
  const categories = await getCategories();

  return categories.find(
    (category) => category.id === id
  );
}