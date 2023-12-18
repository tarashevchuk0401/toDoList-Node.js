import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { AuthService } from '../shared/services/auth.service';
import { CommonModule } from '@angular/common';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let authService: any

  beforeEach(waitForAsync(() => {
    let authServiceSpy = jasmine.createSpyObj('AuthService', ['getIsAuthenticated'])

    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [
        
        {provide: AuthService, useValue: authServiceSpy}
      ]
    });
    fixture = TestBed.createComponent(SidebarComponent);
    authService = TestBed.inject(AuthService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    // expect(component).toBeTruthy();
    pending()
  });
});
