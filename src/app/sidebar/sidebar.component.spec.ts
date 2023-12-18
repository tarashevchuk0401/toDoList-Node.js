import { ComponentFixture, TestBed, fakeAsync, flush, waitForAsync } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { AuthService } from '../shared/services/auth.service';
import { of } from 'rxjs';


fdescribe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let authService: any

  beforeEach(waitForAsync(() => {
    let authServiceSpy = jasmine.createSpyObj('AuthService', ['getIsAuthenticated', 'getAuthStatusListener'])

    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SidebarComponent);
        component = fixture.componentInstance;
        authService = TestBed.inject(AuthService)

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
});
