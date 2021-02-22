import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-front-navbar",
  templateUrl: "./front-navbar.component.html",
})
export class FrontNavbarComponent implements OnInit {
  navbarOpen = false;

  constructor() {}

  ngOnInit(): void {}

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }
}
