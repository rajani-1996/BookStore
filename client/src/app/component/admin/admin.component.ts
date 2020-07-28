import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

 
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  loginUserData = {email:"",password:""};


  constructor(private _auth: AuthService,
    private _router:Router) { }

  ngOnInit() {
  }

  loginUser(){
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res=>{
        console.log(res)
        localStorage.setItem('token',res["token"])
     
        this._router.navigate(['/add-book'])
        },
      err => console.log(err)
    )
 
  }


}





