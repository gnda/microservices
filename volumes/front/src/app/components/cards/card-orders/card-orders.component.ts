import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/models/order/order';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-card-orders',
  templateUrl: './card-orders.component.html',
  styleUrls: ['./card-orders.component.css']
})
export class CardOrdersComponent implements OnInit {
  @Input()
  orders: Order[];
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(
      data =>{
        this.orders = data["orders"];
      }
    );
  }
}
