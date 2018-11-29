import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { SearchComponent } from "./components/search/search.component";
import { AuthGuard } from "./guards/auth.guard";

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "", component: SearchComponent, canActivate: [AuthGuard] }
];