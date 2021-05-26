import { Component, OnInit } from '@angular/core';
import { Profile } from '../_models/profile';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: Profile = new Profile;
  
  constructor(private authService : AuthService, private tokenStorage : TokenStorageService) { }

  ngOnInit(): void {
    const id = this.tokenStorage.getId();
    this.authService.profile(id || "").subscribe(
      data => {
        this.profile.username = data.username;
        this.profile.name = data.name;
        this.profile.last_name = data.last_name; 
        this.profile.phone_number = data.phone_number;
        this.profile.email = data.email;
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
