import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {email:"",password:""};
  constructor(private _auth: AuthService,
    private _router:Router ) { }

  ngOnInit() {
  }
  loginUser(){
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res=>{
        console.log(res["token"])
        localStorage.setItem('token',res["token"])
        console.log("the role is below displayed")
        console.log(localStorage.getItem('token'))
        this._router.navigate(['/'])
        },
      err => console.log(err)
    )
    console.log(this.loginUserData)
  }


}


