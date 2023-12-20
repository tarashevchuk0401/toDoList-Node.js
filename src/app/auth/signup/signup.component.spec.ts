import { ComponentFixture, TestBed, fakeAsync, flush, waitForAsync } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NgForm } from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: any;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getIsAuthenticated', 'signup', 'login']);

    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ],
      imports: [AppModule]
    });
    fixture = TestBed.createComponent(SignupComponent);
    authService = TestBed.inject(AuthService);
    el = fixture.debugElement
    component = fixture.componentInstance;
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use signup logic', () => {
    component.authMode = 'signup';
    spyOn(component, 'onSubmit').and.callThrough();;

    const submit = el.query(By.css('.onSubmit')).nativeElement;
    submit.click();

    expect(component.onSubmit).toHaveBeenCalledTimes(1);
    expect(authService.signup).toHaveBeenCalled();
  });
  
  it('should use login logic', () => {
    component.authMode = 'login';
    spyOn(component, 'onSubmit').and.callThrough();;

    const submit = el.query(By.css('.onSubmit')).nativeElement;
    submit.click();

    expect(component.onSubmit).toHaveBeenCalledTimes(1);
    expect(authService.login).toHaveBeenCalledTimes(1);
    expect(component.authMode).toBe('login')
  });
});
