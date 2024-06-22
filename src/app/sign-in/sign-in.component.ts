import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../A_Data/services/User.services';
import { Router } from '@angular/router';
import { AuthService } from '../A_Data/services/auth.service';
import Swal from 'sweetalert2';
import { User, UserCreateInput } from '../A_Data/User';
import { ToastService } from '../A_Data/services/A_Outil/Toast';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
    form: FormGroup;
  
    constructor(
      private userService: UserService,
      private fb: FormBuilder,
      private router: Router,
      private authService: AuthService,
      private toastService: ToastService // Injectez le service Toast
    ) {
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        surname: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      });
    }
  
    onSubmit() {
      if (this.form.invalid) {
        this.toastService.showError('Formulaire invalide!');
        return;
      } else {
        const user: UserCreateInput = {
          surname: this.form.value.surname!,
          name: this.form.value.name!,
          password: this.form.value.password!,
          mail: this.form.value.email!
        };
        this.userService.create(user).subscribe(
          (response: User) => {
            this.authService.setUserId(response.id);
            this.toastService.showSuccess('Publication réussie!');
            this.form.reset();
            this.router.navigate(['/home']);
          },
          (error: any) => {
            this.toastService.showError(error.message || 'An error occurred');
          }
        );
      }
    }
  
    get password() {
      return this.form.controls['password'];
    }
    get email() {
      return this.form.controls['email'];
    }
    get name() {
      return this.form.controls['name'];
    }
    get surname() {
      return this.form.controls['surname'];
    }
  }