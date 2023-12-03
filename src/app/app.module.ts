import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskList } from './task-list/task-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './shared/materials/materials/materials.module';
import { EditPageComponent } from './edit-page/edit-page.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TaskService } from './shared/services/task.service';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthService } from './shared/services/auth.service';
import { AuthInterceptorInterceptor } from './shared/auth-interceptor.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    TaskList,
    EditPageComponent,
    SignupComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialsModule,
    HttpClientModule,
    ReactiveFormsModule, 
    FormsModule, BrowserAnimationsModule,
  ],
  providers: [
    TaskService,
     AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
