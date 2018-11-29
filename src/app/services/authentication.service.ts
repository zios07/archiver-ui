import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtAuthenticationRequest } from "../models/JwtAuthenticationRequest";
import { environment } from "../../environments/environment";
import { User } from "../models/User";
import { TokenService } from "./token.service";
import { JwtHelper } from "angular2-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  url: string = environment.API_URL;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(jwtAuthenticationRequest: JwtAuthenticationRequest) {
    const headers = new HttpHeaders().set(
      "Content-Type",
      "text/plain; charset=utf-8"
    );
    return this.http.post(
      this.url + "/authentication/authenticate",
      jwtAuthenticationRequest,
      { headers, responseType: "text" }
    );
  }

  getConnectedUser() {
    let user: User;
    let stringUser = localStorage.getItem("connectedUser");
    if (stringUser) {
      user = JSON.parse(stringUser);
    }
    return user;
  }

  isAuthenticated() {
    let jwtHelper = new JwtHelper();
    let token = this.tokenService.getToken();
    if (!token) return false;
    let isExpired = jwtHelper.isTokenExpired(token);
    return !isExpired;
  }

  logout() {
    this.tokenService.deleteToken();
    localStorage.removeItem("connectedUser");
  }
}
