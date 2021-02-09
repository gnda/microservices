import { Component, OnInit, Input } from "@angular/core";
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

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

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      data =>{
        console.log("aaaaa");
        this.products = data["products"];
      }
    );
  }
}
