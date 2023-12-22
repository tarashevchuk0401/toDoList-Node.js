import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environment/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let routerSpy: any;

  const mockedUser: User = {
    id: 'string',
    email: '@gmail.com',
    password: 'string',
    name: 'string',
  }

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);


    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: Router, useValue: routerSpy },
      ]

    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController)

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get isAuthenticated === false', () => {
    spyOn(service, 'getIsAuthenticated').and.returnValue(of(false));
    service.getIsAuthenticated().subscribe(res => {
      expect(res).toBe(false)
    })
  })

  it('should change authorization mode', () => {
    service.changeAuthorizationMode('test');
    service.authorizationMode.subscribe(result => {
      expect(result).toBe('test')
    })
  })

  it('should signuo mocked user', (done) => {
    service.signup(mockedUser);

    const req = httpTestingController.expectOne(environment.apiUrl + '/users/signup');
    expect(req.request.method).toBe('POST');

    req.flush({ token: 'fakeToken', expiresIn: 3600, userId: 'fakeUserId' });

    service.getIsAuthenticated().subscribe((isAuthenticated) => {
      expect(isAuthenticated).toBeTrue();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['task/all'])
      done()
    });
  })

  it('should login mockedUser', (done) => {
    service.login(mockedUser.email, mockedUser.password);

    const req = httpTestingController.expectOne(environment.apiUrl + '/users/login');
    expect(req.request.method).toBe('POST');

    req.flush({ token: 'string', expiresIn: 3600, userId: 'string' })
    done();

    expect(service.getToken()).toBe('string');
    expect(localStorage.getItem('token')).toEqual('string');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['task/all']);
  })

  it('should run logout logic', () => {
    service.logout();

    expect(localStorage.getItem('token')).toBeFalsy();
    expect(service.getToken()).toBeFalsy();
  });


});
