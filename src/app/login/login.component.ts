import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone : false
})
export class LoginComponent implements OnInit 
{

  loginUserData = {email : '', password : ''}

  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() 
  {
  }

  loginUser () 
  {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this._router.navigate(['/special'])
      },
      err => {
        if (err.status === 401) {
          alert(err.error.message || 'Invalid email or password');
        } else {
          alert('Something went wrong. Please try again.');
        }
      }
    )
  }
}