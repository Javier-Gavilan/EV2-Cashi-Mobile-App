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