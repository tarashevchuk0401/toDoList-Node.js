import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskList } from './tasks/task-list/task-list.component';
import { EditPageComponent } from './tasks/edit-page/edit-page.component';
import { SignupComponent } from './auth/signup/signup.component';
import { authGuardGuard } from './shared/guard/auth-guard.guard';


const routes: Routes = [
  {path: '', component: SignupComponent},
  {
    path : 'task',
    loadChildren: () => import('./tasks/task.module').then((m) => m.TaskModule )
  },
  {path: 'signup', component: SignupComponent},
  {path: '**', component: SignupComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
