import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { SearchComponent } from "./components/search/search.component";

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "", component: SearchComponent }
];