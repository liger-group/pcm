import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USERNAME = 'auth-username';
const ROLES = 'auth-roles';
const USER_ID = 'auth-user-id';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
   
  }

  public saveRoles(roles_json : string): void{
      window.sessionStorage.removeItem(ROLES);
      window.sessionStorage.setItem(ROLES, roles_json);
  }

  public saveId(id: number): void{
      window.sessionStorage.removeItem(USER_ID);
      window.sessionStorage.setItem(USER_ID, id.toString());
  }

  public getId(): string | null{
      return window.sessionStorage.getItem(USER_ID);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: string): void {
    window.localStorage.removeItem(USERNAME);
    window.localStorage.setItem(USERNAME, user);
  }

  public getUser(): string | null {
    const user = window.localStorage.getItem(USERNAME);
    return user;
  }

  public hasRole(role : string){
    //TODO SANTIWAGNER
    const roles:string[] = JSON.parse(window.sessionStorage.getItem(ROLES)?.toString() || '[]');
    
    for (let item of roles) {
        if (item === role) {
            return true;
        }
    } 

      return false;
  }
}