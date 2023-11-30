import { Component, OnInit } from '@angular/core';
import { TaskService } from '../shared/services/task.service';
import { Task } from '../shared/models/task.model';
import { delay, map } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskList implements OnInit {

  allTasks: Task[] = [];
  form!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    this.getAllTasks();
    this.form = new FormGroup({
      description: new FormControl(null, { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(300)] }),
    })
  }

  getAllTasks() {
    this.taskService.getAllTasks()
      .pipe(map(item => {
        return item.tasks.map((task: any) => {
          return {
            id: task._id,
            description: task.description,
            isDone: task.isDone,
          }
        })
      }))
      .subscribe(d => {
        this.allTasks = d;
      })
  }

  addNewTask() {
    if(this.form.invalid){
      return
    }
    this.isLoading = true;
    const description = this.form.value.description;
    const image = this.form.value.image as File;  // Extract the File object
    const newTask: Task = {
      description: this.form.value.description,
      id: '',
      isDone: false,
    }

    this.taskService.addTask(newTask).pipe(delay(300)).subscribe(d => {
      this.getAllTasks();
      this.form.reset();
      this.isLoading = false;
    });
  }

  onChangeIsDone(event: boolean, task: Task) {
    const updatedTask = { ...task, isDone: event }
    console.log(updatedTask)
    this.taskService.updateTask(updatedTask).subscribe()
  }

  deleteTask(id: string) {
    this.isLoading = true;
    if (id) {
      this.taskService.deleteTask(id).pipe(delay(300)).subscribe(d => {
        this.getAllTasks()
        this.isLoading= false
      })
    }
  }



}
