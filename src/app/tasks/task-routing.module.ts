import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TaskList } from "./task-list/task-list.component";
import { EditPageComponent } from "./edit-page/edit-page.component";

const routes: Routes = [
    {path : 'all', component: TaskList},
    {path : 'edit-page/:id', component: EditPageComponent},
]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule,
    ],
})
export class TaskRoutingModule{}