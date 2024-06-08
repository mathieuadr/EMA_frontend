import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { UserService } from '../A_Data/services/User.services';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  form = this.fb.group({
    username: [
      '',
      {
        validators: [Validators.required
        ],
        updateOn: 'blur',
      },
    ],
    password: [
      '',
      {validators:[
        Validators.required,
 
      ]},
    ]});  


    constructor(private userService: UserService, private fb: FormBuilder, private router: Router){
    }
  onSubmit(){
    
    this.userService.login(this.form.value.username!, this.form.value.password!).subscribe(response => {
      if (response.status === 200) {
        this.router.navigate(['/home']);
      }
    }, error => {
      alert('Login failed');
    });
  }
  }

