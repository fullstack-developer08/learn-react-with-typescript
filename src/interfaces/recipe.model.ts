import { Ingredient } from './ingredients.model';

export interface Recipes {
    recipes: Recipe[]
}

export interface Recipe {
    recipe: RecipeData
}

export interface RecipeData {
    label: string;
    image: string;
    calories: string;
    ingredients: Ingredient[];
}


[
    {recipe: {}},
    {recipe: {}}
]

