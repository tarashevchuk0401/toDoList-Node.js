import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskList } from './task-list/task-list.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { MaterialsModule } from '../shared/materials/materials/materials.module';
import { TaskRoutingModule } from './task-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TaskList,
    EditPageComponent
  ],
  imports: [
    CommonModule,
    MaterialsModule,
    TaskRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TaskModule { }
