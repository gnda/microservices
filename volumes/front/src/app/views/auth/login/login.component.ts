import { NgModule } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@NgModule({
  providers: [FormBuilder]
})
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  error: JSON;
  form: FormGroup;
  showAlert: boolean;

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  async login() {
    const val = this.form.value;

    if (val.username && val.password) {
      this.authService.login(val.username, val.password).pipe(
        map(() => {
          this.showAlert = false;
          this.router.navigateByUrl('/');
        }),
        catchError((err: HttpErrorResponse) => {
          this.showAlert = true;
          this.error = err.error;

          return throwError(err);
        })
      ).subscribe();
    }
  }

  ngOnInit(): void {}
}