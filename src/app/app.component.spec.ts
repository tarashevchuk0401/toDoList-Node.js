import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from './shared/services/auth.service';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  let authServiceSpy = jasmine.createSpyObj('AuthServices', ['autoAuth']);
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppModule],
      declarations: [AppComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    })
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'to-do-node'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('to-do-node');
  });

  it('should run auto login', () => { 
    component.ngOnInit();
    expect(authService.autoAuth).toHaveBeenCalledTimes(1)
  })

});
