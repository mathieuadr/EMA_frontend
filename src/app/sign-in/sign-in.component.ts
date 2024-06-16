import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../A_Data/services/User.services';
import { Router } from '@angular/router';
import { AuthService } from '../A_Data/services/auth.service';
import Swal from 'sweetalert2';
import { User, UserCreateInput } from '../A_Data/User';

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
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],

    });
  }

  Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  onSubmit() {
    if (this.form.invalid) {
      this.Toast.fire({
        icon: 'error',
        title: 'Formulaire invalide!',
      });
      return;
    }
    else {
      const user: UserCreateInput = {
        surname: this.form.value.surname!,
        name: this.form.value.name!,
        password: this.form.value.password!,
        mail: this.form.value.email!
      }
      this.userService.sign_in(user).subscribe(
        (response: User) => {
          this.authService.setUserId(response.id_user);
          this.Toast.fire({
            icon: 'success',
            title: 'Publication réussie!',
          });
          this.form.reset();
          this.router.navigate(['/home']); 
        },
        (error: any) => {
          this.Toast.fire({
            icon: 'error',
            title: 'Erreur!',
            text: error.message || 'An error occurred'
          })
        });
    }
  }


  get password(){
  return this.form.controls['password'];
}
  get email(){
  return this.form.controls['email'];
}
  get name(){
  return this.form.controls['name'];
}
  get surname(){
  return this.form.controls['surname'];
}
  
}
