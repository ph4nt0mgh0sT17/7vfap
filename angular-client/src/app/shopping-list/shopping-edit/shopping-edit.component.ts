import {Component, Input, OnInit} from '@angular/core';
import {Ingredient} from "../../models/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @Input() onAddIngredient: ((ingredient: Ingredient) => void) | undefined;

  ingredientName = '';
  ingredientAmount = 0;

  constructor() { }

  ngOnInit() {
  }

  addIngredient(): void {
    if (this.onAddIngredient)
      this.onAddIngredient(new Ingredient(this.ingredientName, this.ingredientAmount));

    this.ingredientName = '';
    this.ingredientAmount = 0;
  }

}
