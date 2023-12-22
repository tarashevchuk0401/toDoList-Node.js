import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '../shared/services/auth.service';
import { DebugElement, inject } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: any;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    let authServiceSpy = jasmine.createSpyObj('AuthService', ['getIsAuthenticated', 'getAuthStatusListener', 'logout']);


    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        authService = TestBed.inject(AuthService);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be authorized', () => {
    authService.getIsAuthenticated.and.returnValue(of(true));
    authService.getAuthStatusListener.and.returnValue(of(true));
    fixture.detectChanges();

    expect(component.isAuthenticated).toBeTruthy();
  })

  it('should logout', () => {
    authService.getIsAuthenticated.and.returnValue(of(true));
    authService.getAuthStatusListener.and.returnValue(of(true));
    fixture.detectChanges();
    
    expect(component.isAuthenticated).toBe(true);
    
    const logoutBtn = el.query(By.css('.logout')).nativeElement;
    logoutBtn.click();
    
    expect(component.isAuthenticated).toBeFalsy();
  })
});
