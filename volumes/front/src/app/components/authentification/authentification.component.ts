import { Authentification } from './../../models/authentification';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthentificationService } from "../../services/authentification.service";

@Component({
  selector: 'authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  @Input() authentificationService: AuthentificationService;
  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  loginProcess(formValues) {
    if (formValues.login === undefined || formValues.password === undefined) {
      console.log("Not logging in because login and password are null");
    } else {
      // Could use this.credentials
      this.authentificationService.login(formValues.login, formValues.password);
    }
  }
}
