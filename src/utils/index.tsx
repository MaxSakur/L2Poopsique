import { CraftCollection } from "@/app/components/CraftCalculator";
import { sAccessoriesCraftList } from "@/app/data/sAccessoriesCraftList";
import { sArmorCraftList } from "@/app/data/sArmorCraftList";
import { sWeaponsCraftList } from "@/app/data/sWeaponCraftList";
import { conversionRates } from "@/app/data/stokatoExchange";
import moment from "moment";

type unionItemCraft = {
  name: string;
  unsealCostKK?: number;
  sa?: {
      green: string;
      red: string;
      blue: string;
  };
  ingredients: {
    name: string;
    count: number;
  }[];
}


export const unionCraftData = [
    ...sWeaponsCraftList,
    ...sArmorCraftList,
    ...sAccessoriesCraftList,
  ];

export function parseURL(url: string) {
    const trimmedURL = url.replace("https://l2.dropspoil.com/npc", "");
    const cleanedURL = trimmedURL.replace(".html", "");

    const parts = cleanedURL.split('/').filter(el=> el.length > 0);
    const rb_id = parseInt(parts[0], 10);
    const rb_hash = parts.slice(1).join('-');

    const result = { rb_id, rb_hash };
    return result;
}


export function calculateTimeRemaining(eventDate: moment.Moment) {
    const now = moment();
    const targetDate = moment(eventDate);

    if (now.isAfter(targetDate)) {
        return "Expired";
    }

    const duration = moment.duration(targetDate.diff(now));
    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.asMinutes()) % 60;

    return `${hours === 0 ? '' : hours+' '+'hours'} ${minutes} minutes`;
}


export function replaceNpcWithLoc(url: string) {
    return url.replace("/npc/", "/loc/");
}

interface Item {
  name: string;
  count: number;
}

interface CraftItem {
  name: string;
  ingredients: Item[];
  quantity?: number;
}

const specialSort = (arr: Item[]): Item[] => {
  const specialOrder: { [key: string]: number } = {
    "Recipe:": -1, 
    "Crystal S": 1, 
    "Gemstone S": 2, 
  };

  const getPriority = (name: string): number => {
    for (const [key, priority] of Object.entries(specialOrder)) {
      if (name.includes(key)) {
        return priority;
      }
    }
    return 0; 
  };

  return arr.sort((a, b) => {
    const priorityA = getPriority(a.name);
    const priorityB = getPriority(b.name);

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    return a.name.localeCompare(b.name);
  });
};


export const convertItemsToResources = (data: CraftCollection): Item[] | any => {

  const filtered = data.map(item => {
    const res = unionCraftData.find(el => el.name === item.name)
    return {...res, quantity: item.count}
  }) as CraftItem[];
  
  const res = filtered.reduce((acc: Item[], item: CraftItem) => {
    item.ingredients.forEach(ingredient => {  
        acc.push({ ...ingredient, count: item.quantity ? ingredient.count * item.quantity : ingredient.count });
    });
    return acc;
  }, []);

  function sumDuplicateIngredients(ingredients: Item[]): Item[] {
    const ingredientMap: Record<string, number> = {};
  
    ingredients.forEach(ingredient => {
      const { name, count } = ingredient;
      if (ingredientMap[name]) {
        ingredientMap[name] += count;
      } else {
        ingredientMap[name] = count;
      }
    });
  
    return Object.keys(ingredientMap).map(name => ({
      name,
      count: ingredientMap[name]
    }));
  }

return specialSort(sumDuplicateIngredients(res))
};

export function randomizeColor(min: number = 100, max: number = 240): string {
  const randomRed = Math.floor(Math.random() * (max - min + 1)) + min;
  const randomGreen = Math.floor(Math.random() * (max - min + 1)) + min;
  const randomBlue = Math.floor(Math.random() * (max - min + 1)) + min;
  return `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
}
interface ConversionResult {
  totalFangs: number;
  unmatchedItems: Item[];
}

export function convertItemsToFangs(items: Item[]): ConversionResult {
  let totalFangs = 0;
  const unmatchedItems: Item[] = [];

  items.forEach(item => {
    if (item.name in conversionRates) {
      totalFangs += item.count * conversionRates[item.name];
    } else {
      unmatchedItems.push(item);
    }
  });

  return { totalFangs, unmatchedItems };
}

interface Item {
  name: string;
  count: number;
}

interface CraftItem {
  name: string;
  unsealCostKK: number;
  ingredients: Item[];
}



export function getAA(data: CraftCollection): number {
  return data.reduce((sum, item) => {
    const craftItem:unionItemCraft | undefined = unionCraftData.find(ci => ci.name === item.name);
    if(craftItem && craftItem.unsealCostKK) {
      return sum + craftItem.unsealCostKK  * item.count;
    }
    else return sum 
  }, 0);
}