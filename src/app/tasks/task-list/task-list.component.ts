import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../../shared/services/task.service';
import { Task } from '../../shared/models/task.model';
import { Subject, concat, delay, takeUntil } from 'rxjs';
import {  FormControl, FormGroup, Validators } from '@angular/forms';

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
    this.taskService.getAllTasks().subscribe(tasks => {
      this.isLoading = false;
      this.allTasks = tasks;
    })
  }

  addNewTask() {
    if (this.form.invalid) {
      return
    }

    const newTask: Task = {
      description: this.form.value.description,
      id: '',
      isDone: false,
      creator: '',
    }

    // Creating one observable from  two separate observables. Executing in sequence
    concat(this.taskService.addTask(newTask), this.taskService.getAllTasks())
      .pipe(takeUntil(this.unsubsSubject$))
      .subscribe(tasks => this.allTasks = tasks);
  
  }

  onChangeIsDone(event: boolean, task: Task) {
    const updatedTask = { ...task, isDone: event }
    this.taskService.updateTask(updatedTask).subscribe()
  }

  deleteTask(id: string) {
    if (!id) {
      return
    }

    this.isLoading = true;

    concat(this.taskService.deleteTask(id), this.taskService.getAllTasks())
      // //Better user experience, longer spinner rendering 
      .pipe(takeUntil(this.unsubsSubject$), delay(500))
      .subscribe(tasks => {
        this.allTasks = tasks;
        this.isLoading = false;
      });
  }



}
