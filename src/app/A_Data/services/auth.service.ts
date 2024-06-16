import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /*cette classe permet de garder en cache de maniére locale l'id de l'utilisateur.
  L'id n'etant pas une information sensible cela ne pose pas de probléme.
  La fluidité des intéractions et directement impactée par cet élément
  */



  private userIdKey = 'userId'; // Clé pour stocker l'ID utilisateur dans localStorage

  setUserId(id: string): void {
    localStorage.setItem(this.userIdKey, id); // Stocker l'ID utilisateur dans localStorage
  }

  getUserId(): string | null {
    return localStorage.getItem(this.userIdKey); // Récupérer l'ID utilisateur depuis localStorage
  }

  clearUserId(): void {
    localStorage.removeItem(this.userIdKey); // Supprimer l'ID utilisateur de localStorage
  }

}
