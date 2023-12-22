import { TestBed } from '@angular/core/testing';
import { AuthInterceptorInterceptor } from './auth-interceptor.interceptor';
import { AuthService } from '../services/auth.service';
import { HTTP_INTERCEPTORS,  HttpClientModule  } from '@angular/common/http';
import { ErrorInterceptor } from './error.interceptor';


describe('AuthInterceptorInterceptor', () => {


    beforeEach(() => {
        let authServiceSpy = jasmine.createSpyObj('AuthService', [''])

        TestBed.configureTestingModule({
            providers: [
                AuthInterceptorInterceptor,
                { provide: AuthService, useValue: authServiceSpy },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: ErrorInterceptor,
                    multi: true,
                },
            ],
            imports: [HttpClientModule],
        })
    });

    it('should be created', () => {
        const interceptor: AuthInterceptorInterceptor = TestBed.inject(AuthInterceptorInterceptor);
        expect(interceptor).toBeTruthy();
    });
});
