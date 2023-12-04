import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../shared/services/task.service';
import { Task } from '../shared/models/task.model';
import { Subject, debounceTime, delay, map, takeUntil, tap } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskList implements OnInit, OnDestroy {
  unsubsSubject$ = new Subject()
  allTasks: Task[] = [];
  form!: FormGroup;
  isLoading: boolean = true;

  constructor(
    private taskService: TaskService,
  ) { }


  ngOnInit(): void {
    this.getAllTasks();
    this.form = new FormGroup({
      description: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(500)]
      }),
    })
  }

  ngOnDestroy(): void {
    this.unsubsSubject$.next(null);
    this.unsubsSubject$.complete()
  }

  getAllTasks() {
    this.taskService.getAllTasks()
      .pipe(map(item => {
        return item.tasks.map((task: any) => {
          return {
            id: task._id,
            description: task.description,
            isDone: task.isDone,
            creator: task.creator
          }
        })
      }))
      .subscribe(d => {
        this.isLoading = false;
        this.allTasks = d;
      })
  }

  addNewTask() {
    if (this.form.invalid) {
      return
    }
    const description = this.form.value.description;
    const newTask: Task = {
      description: this.form.value.description,
      id: '',
      isDone: false,
      creator: '',
    }

    this.taskService.addTask(newTask).pipe(
      takeUntil(this.unsubsSubject$))
      .subscribe(() => {
        ///WHY ??
        setTimeout(() => {
          this.getAllTasks();
        }, 200)

        this.form.reset();

      });
  }

  onChangeIsDone(event: boolean, task: Task) {
    const updatedTask = { ...task, isDone: event }
    this.taskService.updateTask(updatedTask).subscribe()
  }

  deleteTask(id: string) {
    if (id) {
      this.taskService.deleteTask(id)
        .pipe(takeUntil(this.unsubsSubject$), debounceTime(200))
        .subscribe(() => {
          this.getAllTasks()
          // //Better user experience, longer spinner rendering 
          //   this.isLoading = false;
        })
    }
  }



}
