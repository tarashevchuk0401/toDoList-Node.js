import { TestBed, fakeAsync, flush } from '@angular/core/testing';

import { TaskService } from './task.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environment/environment';
import { Task } from '../models/task.model';

describe('HttpService', () => {
  let service: TaskService;
  let httpTestingController: HttpTestingController;

  const dummyTasks: Task[] = [
    { id: '1', description: 'Task 1', isDone: false, creator: 'User1' },
    { id: '2', description: 'Task 2', isDone: true, creator: 'User2' }
  ];


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TaskService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get tasks', fakeAsync(() => {
    service.getAllTasks().subscribe(tasks => {
      expect(tasks[0].description).toEqual('Task 1');
    });

    const req = httpTestingController.expectOne(environment.apiUrl + '/tasks');
    expect(req.request.method).toBe('GET');
    req.flush({ tasks: dummyTasks });
  }));

  it('should add new task', fakeAsync(() => {
    service.addTask(dummyTasks[0]).subscribe();

    const req = httpTestingController.expectOne(environment.apiUrl + '/tasks');
    expect(req.request.method).toBe('POST');

    flush();
  }));

  it('should update task', fakeAsync(() => {
    service.updateTask(dummyTasks[1]).subscribe();

    const req = httpTestingController.expectOne(environment.apiUrl + '/tasks');
    expect(req.request.method).toBe('PUT');

    req.flush({message: 'message'});
  }));

  it('should get task by id ',  fakeAsync(() => {
    service.getTaskById('123').subscribe();

    const req = httpTestingController.expectOne(environment.apiUrl + '/tasks/123');
    expect(req.request.method).toBe('GET');
    expect(service.getTaskById).toBeTruthy()
    
    flush();
  }))

  it('should delete task', () => {
    service.deleteTask('456').subscribe();

    const req = httpTestingController.expectOne(environment.apiUrl + '/tasks/456');
    expect(req.request.method).toBe('DELETE');
  });

});
