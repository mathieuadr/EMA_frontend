import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../A_Data/services/User.services';
import Swal from 'sweetalert2';
import { User } from '../A_Data/User';
import { AuthService } from '../A_Data/services/auth.service';
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
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      Email: ['', [Validators.required,Validators.email]],
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

    const { Email, password } = this.form.value;

    this.userService.login(Email, password).subscribe(
      (response: User) => {
        this.authService.setUserId(response.id_user);
        this.Toast.fire({
          icon: 'success',
          title: 'Connexion réussie!',
        });
        this.form.reset();
        this.router.navigate(['/home']);  // Adjust the route as needed
      },
      (error: any) => {
        this.Toast.fire({
          icon: 'error',
          title: 'Erreur de connexion!',
          text: error.message || 'Erreur inconnue',
        });
      }
    );
  }
}
