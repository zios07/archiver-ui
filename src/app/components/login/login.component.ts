import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenService } from 'src/app/services/token.service';
import { ToastrService } from 'ngx-toastr';
import { delay } from "rxjs/operators";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title = 'Login';
  form: FormGroup;
  submitted = false;

  returnUrl: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor( private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      login: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.authService.login(this.form.value).pipe(delay(2000)).subscribe((resp : any) => {
      this.tokenService.saveToken(resp);
      this.router.navigate(['']);
    }, resp => {
      this.submitted = false;
      if( resp.status === 401 || resp.status === 403)
        resp.error ? this.toastr.error(resp.error) : this.toastr.error("Incorrect credentials");
    });
  }
}
