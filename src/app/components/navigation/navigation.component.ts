import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  title:String = "Explorateur d'achives";
  loginPage: boolean = true;

  constructor(
    private iconRegistry: MatIconRegistry, 
    private sanitizer: DomSanitizer,
    private authService: AuthenticationService,
    private router: Router
    ) {
      this.initMenu();
   }

  ngOnInit() {
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  initMenu() {
    this.router.events.subscribe(val => {
      if(val instanceof NavigationEnd)
        if(this.router.routerState.snapshot.url === "/login")
          this.loginPage = false;
        else
          this.loginPage = true;
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);

  }


}
