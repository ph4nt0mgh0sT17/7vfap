import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  constructor() { }

  ngOnInit() {
  }

  addIngredientToList = (ingredient: Ingredient) => {
    if (ingredient == null)
      throw new Error('The ingredient parameter cannot be undefined/null.')

    this.ingredients.push(ingredient);
  }

  deleteIngredient = (ingredient: Ingredient) => {
    if (ingredient == null)
      throw new Error('The ingredient parameter cannot be undefined/null.')

    this.ingredients = this.ingredients.filter(x => x.name !== ingredient.name);
  }

}
