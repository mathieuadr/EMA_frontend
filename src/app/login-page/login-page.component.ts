import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../A_Data/services/User.services';
import Swal from 'sweetalert2';
import { User } from '../A_Data/User';
import { AuthService } from '../A_Data/services/auth.service';
import { ToastService } from '../A_Data/services/A_Outil/Toast';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']  // correction ici
})
export class LoginPageComponent {
  form: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toast: ToastService,
  ) {
    this.form = this.fb.group({
      Email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]],
    });
  }



  onSubmit() {
    if (this.form.invalid) {
      this.toast.showError('Invalid');
      return;
    }

    const { Email, password } = this.form.value;

    this.userService.login(Email, password).subscribe(
      (response: User) => {
        if (response && response.id) {
        this.authService.setUserId(response.id);
        this.toast.showSuccess("Login");
        this.form.reset();
        this.router.navigate(['/home']);  // Adjust the route as needed
        }
        else{this.toast.showError('Unknown user')}
      ;},
      (error: any) => {
        this.toast.showError('Incorrect information');
      }
    );
  }

  get password(){
    return this.form.controls['password'];
  }
  get Email(){
    return this.form.controls['Email'];
  }
}
 