import { JwtModule } from "@auth0/angular-jwt";
import { NgModule } from "@angular/core";

export function tokenGetter(key) {
  return localStorage.getItem(key);
}

@NgModule({
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost"],
      },
    })
  ],
  exports: [JwtModule],
})
export class AppJwtModule { }