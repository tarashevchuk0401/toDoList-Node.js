import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { AuthService } from '../shared/services/auth.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let authService: any;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    let authServiceSpy = jasmine.createSpyObj('AuthService', ['getIsAuthenticated', 'getAuthStatusListener', 'logout'])

    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(SidebarComponent);
      component = fixture.componentInstance;
      authService = TestBed.inject(AuthService);
      el = fixture.debugElement;
    })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isAuthenticated to true', () => {
    authService.getAuthStatusListener.and.returnValue(of(true));
    authService.getIsAuthenticated.and.returnValue(of(true));

    fixture.detectChanges();

    expect(component.isAuthenticated).toBeTruthy();
  })

  it('should set isAuthenticated to false', () => {
    authService.getAuthStatusListener.and.returnValue(of(false));
    authService.getIsAuthenticated.and.returnValue(of(false));

    fixture.detectChanges();

    expect(component.isAuthenticated).toBe(false);
  })

  it('should logout after click logout button', () => {
    authService.getAuthStatusListener.and.returnValue(of(true));
    authService.getIsAuthenticated.and.returnValue(of(true));
    fixture.detectChanges()

    const logoutBtn = el.query(By.css('.logout')).nativeElement;
    logoutBtn.click();
    
    expect(authService.logout).toHaveBeenCalledTimes(1)
  })
});
