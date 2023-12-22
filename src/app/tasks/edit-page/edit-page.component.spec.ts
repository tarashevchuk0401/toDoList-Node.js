import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EditPageComponent } from './edit-page.component';
import { TaskService } from 'src/app/shared/services/task.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { FormsModule } from '@angular/forms';
import { MaterialsModule } from 'src/app/shared/materials/materials/materials.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from 'express';

describe('EditPageComponent', () => {
  let component: EditPageComponent;
  let fixture: ComponentFixture<EditPageComponent>;
  let taskService: TaskService;
  let el: DebugElement

  const mockTask = {
    _id: '123',
    description: 'Test task',
    isDone: false,
    creator: 'John Doe'
  };

  beforeEach(() => {
    let TaskServiceSpy = jasmine.createSpyObj('TaskService', ['getTaskById', 'updateTask']);
    TaskServiceSpy.getTaskById = jasmine.createSpy().and.returnValue(of({ task: mockTask }));
    TaskServiceSpy.updateTask = jasmine.createSpy().and.returnValue(of({ message: 'mockTask' }));

    TestBed.configureTestingModule({
      declarations: [EditPageComponent],
      providers: [
        { provide: TaskService, useValue: TaskServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' })
          }
        },
      ],
      imports: [RouterTestingModule, AppModule, FormsModule, MaterialsModule]
    });
    fixture = TestBed.createComponent(EditPageComponent);
    taskService = TestBed.inject(TaskService);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get task', fakeAsync(() => {
    tick(500);

    expect(component.isLoading).toBe(false);
    expect(component.currentTask.description).toEqual('Test task');
    expect(taskService.getTaskById).toHaveBeenCalledWith('123');
  }));

  it('should run edit logic', () => {
    spyOn(component, 'editTask').and.callThrough();

    const btnEdit = el.query(By.css('.edit')).nativeElement;
    btnEdit.click();

    expect(component.editTask).toHaveBeenCalled();
    expect(taskService.updateTask).toHaveBeenCalledTimes(1);
  })
});
