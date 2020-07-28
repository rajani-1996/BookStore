import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private _auth:AuthService, private _router:Router){}
    
  canActivate():boolean
  {
      if (this._auth.loggedInAdmin()) {
      console.log('true');
      return true;
    }
    else {
      console.log('you have to be an admin to view this page!!');
      alert('Admin privileges denied!!')
      this._router.navigate(['/login']);
    }
  }
  
}

 


