import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';


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
