import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  showSuccess(message: string) {
    this.Toast.fire({
      icon: 'success',
      title: message,
    });
  }

  showError(message: string) {
    this.Toast.fire({
      icon: 'error',
      title: message,
    });
  }
}
