import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpUserEvent, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // add a custom header
    let token:string = this.tokenService.getToken();

    let customReq ;
    if(token === null)
      customReq = request.clone();
    else
      customReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + this.tokenService.getToken())
      });
		// pass on the modified request object
		return next.handle(customReq);
  }
  
}
