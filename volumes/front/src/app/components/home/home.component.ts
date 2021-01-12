import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/models/response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products;
  productSub;

  constructor(private productServices: ProductsService) { }

  ngOnInit(): void {
    this.productSub = this.productServices.getProducts().subscribe(
      (response: Response)=>{
        this.products = response.result;
      },
      (error)=>{
        console.log(error);

      }

    )
  }

}
