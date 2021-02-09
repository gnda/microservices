import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import Popper from "popper.js";

@Component({
  selector: 'app-product-dropdown',
  templateUrl: './product-dropdown.component.html',
  styleUrls: ['./product-dropdown.component.css']
})
export class ProductDropdownComponent implements OnInit {
  dropdownPopoverShow = false;
  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef: ElementRef;
  popper = document.createElement("div");
  ngOnInit() {
    this.popper.style.zIndex = "1";
    this.popper.innerHTML = `<div class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1" style="min-width:12rem" #popoverDropdownRef>
  <a href="#pablo" class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent  text-gray-800">
    Edit Product
  </a>
  <a href="#pablo" class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent  text-gray-800">
    Delete Product
  </a>
</div>`;
  }
  toggleDropdown(event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
      this.destroyPopper();
    } else {
      this.dropdownPopoverShow = true;
      this.createPoppper();
    }
  }
  destroyPopper() {
    this.popper.parentNode.removeChild(this.popper);
  }
  createPoppper() {
    new Popper(this.btnDropdownRef.nativeElement, this.popper, {
      placement: "bottom-end",
    });
    this.btnDropdownRef.nativeElement.parentNode.insertBefore(
      this.popper,
      this.btnDropdownRef.nativeElement.nextSibling
    );
  }
}
