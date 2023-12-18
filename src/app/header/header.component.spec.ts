import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AuthService } from '../shared/services/auth.service';
import { inject } from '@angular/core';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: any;

  beforeEach(waitForAsync(() => {
    let authServiceSpy = jasmine.createSpyObj('AuthService', ['getIsAuthenticated']);

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    })

    fixture = TestBed.createComponent(HeaderComponent);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

  it('should create', () => {
    pending()
    // expect(component).toBeTruthy();
  });
});
