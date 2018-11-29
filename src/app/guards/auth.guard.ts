import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import 'rxjs/add/observable/of';
import { JwtHelper } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router) {
    
  }

  canActivate(router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    console.log("Guard !!");
    let activate = false;
    let jwtHelper = new JwtHelper();
    var token = localStorage.getItem('token');
    if(token){
    activate = !jwtHelper.isTokenExpired(token);
    }

    if(activate)
    return activate;

    this.router.navigate(['login'], {queryParams: {src: state.url}});
    return false;
  }
}