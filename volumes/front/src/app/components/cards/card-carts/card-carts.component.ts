import { Component, OnInit, Input } from '@angular/core';
import { Cart } from 'src/app/models/cart/cart';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-card-carts',
  templateUrl: './card-carts.component.html',
  styleUrls: ['./card-carts.component.css']
})
export class CardCartsComponent implements OnInit {
  @Input()
  carts: Cart[];
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCarts().subscribe(
      data =>{
        this.carts = data["carts"];
      }
    );
  }
}
