import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private _router: Router) {}

  canActivate(): boolean {

    const currentUser = localStorage.getItem('ip_address');
    // console.log(currentUser);
    
    if (currentUser!==null) {
      // logged in so return true
      return true;
    }else{
      window.location.reload
      this._router.navigate(["/signup"])
      return false

    }
  }
}