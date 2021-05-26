import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TokenStorageService } from '../_services/token-storage.service';
import { Profile } from '../_models/profile';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  value = 'Clear me';

  year: number = new Date().getFullYear();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  hasRoleManager = false;
  hasRoleAdmin = false;

  constructor(private breakpointObserver: BreakpointObserver, private tokenStorageService : TokenStorageService, private authService : AuthService) {
     this.hasRoleManager = tokenStorageService.hasRole("ROLE_MANAGER");
     this.hasRoleAdmin = tokenStorageService.hasRole("ROLE_ADMIN"); 
  }

  profile: Profile = new Profile;

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  ngOnInit(): void {
    const id = this.tokenStorageService.getId();
    this.authService.profile(id || "").subscribe(
      data => {
        this.profile.username = data.username;
        this.profile.name = data.name;
        this.profile.last_name = data.last_name; 
        this.profile.phone_number = data.phone_number;
        //this.tokenStorage.saveToken(data.accessToken);
        //this.tokenStorage.saveUser(data.username);
        //this.tokenStorage.saveRoles(JSON.stringify(data.roles));
        //this.tokenStorage.saveId(data.id);
        //this.isLoginFailed = false;
        //this.isLoggedIn = true;
        //this.roles = this.tokenStorage.getUser().roles;
        //this.reloadPage();
      },
      err => {
        //this.errorMessage = err.error.message;
        //this.isLoginFailed = true;
      }
    );
  }

}
