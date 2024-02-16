interface Ingredient {
  name: string;
  count: number;
}

interface CraftItem {
  ingredients: Ingredient[];
  quantity: number;
  unsealCostKK?: number; // Добавлено в качестве опционального поля, если таковое имеется в объектах
}

// Функция для суммирования ингредиентов с учетом количества изготавливаемого предмета
export function sumIngredients(
  craftItems?: CraftItem[]
): Record<string, number> {
  const ingredientsSum: Record<string, number> = {};

  craftItems?.forEach(({ ingredients, quantity }) => {
    ingredients.forEach(({ name, count }) => {
      if (!ingredientsSum[name]) {
        ingredientsSum[name] = 0;
      }
      ingredientsSum[name] += count * quantity;
    });
  });

  return ingredientsSum;
}

// Допустим, у нас есть массив craftItems, который взят из вашего изображения:
const craftItems: CraftItem[] = [
  // Здесь должны быть объекты из вашего изображения
];

// Вызов функции и вывод результата
const totalIngredients = sumIngredients(craftItems);
console.log(totalIngredients);
