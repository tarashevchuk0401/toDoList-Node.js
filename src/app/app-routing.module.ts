import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskList } from './task-list/task-list.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { SignupComponent } from './auth/signup/signup.component';
import { authGuardGuard } from './shared/auth-guard.guard';


const routes: Routes = [
  {path: '', component: SignupComponent},
  {path: 'task', component: TaskList, canActivate: [authGuardGuard]},
  {path: 'edit-page/:id', component: EditPageComponent, canActivate: [authGuardGuard]},
  {path: 'signup', component: SignupComponent},
  {path: '**', component: SignupComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
