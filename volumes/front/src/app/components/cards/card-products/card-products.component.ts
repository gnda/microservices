import { Component, OnInit, Input } from "@angular/core";
import { Product } from 'src/app/models/inventory/product';
import { InventoryService } from 'src/app/services/inventory/inventory.service';

@Component({
  selector: "app-card-products",
  templateUrl: "./card-products.component.html",
})
export class CardProductsComponent implements OnInit {
  @Input()
  products: Product[];
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.inventoryService.getProducts().subscribe(
      data =>{
        this.products = data["products"];
      }
    );
  }
}
