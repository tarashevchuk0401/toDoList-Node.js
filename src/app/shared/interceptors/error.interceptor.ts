import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private matDialog: MatDialog) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.error.message);
        if (error.error.message) {
          this.matDialog.open(DialogComponent, { data: { message: error.error.message } });
        }
        return throwError(() => {
          console.log('Error')
        })
      })
    );
  }
}
