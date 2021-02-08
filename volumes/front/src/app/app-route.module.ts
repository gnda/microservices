import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { HomeComponent } from './components/home/home.component';
import { ShowOrderComponent } from './components/show-order/show-order.component';
import { ShowProductComponent } from './components/show-product/show-product.component';

const routes: Routes = [
    { path: "login", component: AuthentificationComponent },
    { path: "", component: HomeComponent },
    { path: "showproduct", component: ShowProductComponent },
    { path: "showorder", component: ShowOrderComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload", useHash: false })],
    exports: [RouterModule]
})

export class AppRouteModule {}