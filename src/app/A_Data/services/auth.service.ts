import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId: String | null = null;

  setUserId(id: String): void {
    this.userId = id;
  }

  getUserId(): String | null {
    return this.userId;
  }

  clearUserId(): void {
    this.userId = null;
  }
}
