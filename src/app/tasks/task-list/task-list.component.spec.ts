import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { TaskList } from './task-list.component';
import { TaskService } from 'src/app/shared/services/task.service';
import { of } from 'rxjs';
import { Task } from 'src/app/shared/models/task.model';
import { AppModule } from 'src/app/app.module';
import { MaterialsModule } from 'src/app/shared/materials/materials/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
    let component: TaskList;
    let fixture: ComponentFixture<TaskList>;
    let taskService: any;

    const example: Task = {
        id: 'string',
        description: 'string',
        isDone: false,
        creator: 'string'
    }

    beforeEach(() => {
        let taskServiceSpy = jasmine.createSpyObj('TaskService', ['getAllTasks', 'addTask', 'updateTask'])

        TestBed.configureTestingModule({
            declarations: [TaskList],
            providers: [
                { provide: TaskService, useValue: taskServiceSpy }
            ],
            imports: [ReactiveFormsModule, FormsModule, CommonModule, MaterialsModule, AppModule, RouterTestingModule]
        });
        fixture = TestBed.createComponent(TaskList);
        taskService = TestBed.inject(TaskService);
        component = fixture.componentInstance;       
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get tasks', () => {
        taskService.getAllTasks.and.returnValue(of([example]));

        fixture.detectChanges();

        expect(component.allTasks).toBeTruthy();
        expect(component.allTasks.length).toBe(1);
        expect(taskService.getAllTasks).toHaveBeenCalledTimes(1);
    }); 
});
