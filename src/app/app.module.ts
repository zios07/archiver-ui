import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatDatepickerModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatTooltipModule,
  MatCardModule,
  MatInputModule,
  MatIconRegistry,
  MatProgressSpinnerModule,
  MatTab,
  MatTabsModule,
  MatTableModule,
  MatPaginator,
  MatPaginatorModule,
  MatDialogModule,
  MatGridListModule,
  MatRadioButton,
  MatRadioButtonBase,
  MatRadioModule,
  MatSortModule,
  MatSelectModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MatCheckboxModule
} from '@angular/material';
import { SearchComponent } from './components/search/search.component';
import { routes } from './app.routes';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { RequestInterceptorService } from './services/request-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    LoginComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    MatTabsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthenticationService,
    { 
			provide	: HTTP_INTERCEPTORS, 
			useClass: RequestInterceptorService,
			multi: true 
    }, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
