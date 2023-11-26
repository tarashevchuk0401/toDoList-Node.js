import { Component, OnInit } from '@angular/core';
import { TaskService } from '../shared/services/task.service';
import { Task } from '../shared/models/task.model';
import { map } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskList implements OnInit {

  allTasks: Task[] = [];
  form!: FormGroup;

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder
    ){}

  ngOnInit(): void {
    this.getAllTasks();
    this.form = new FormGroup({
      description: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      // isDone: new FormControl(false)
      image: new FormControl(null, { validators: [Validators.required]})
    })
  }

  getAllTasks(){
    this.taskService.getAllTasks()
    .pipe(map(item => {
      return item.tasks.map((task : any) => {
        return {
          id: task._id,
          description: task.description,
          isDone : task.isDone,
        }
      })
    }))
    .subscribe(d => {
      this.allTasks = d;
    })
  }

  // addNewTask(){ 
  //   let task: Task = {
  //     isDone: false,
  //     description: this.form.value.description,
  //     image : this.form.value.image
  //   }
  //   this.taskService.addTask(task.description, task.image).subscribe(d => {
  //     this.getAllTasks()
  //     this.form.reset();
  //   })
  // }

  addNewTask() { 
    const description = this.form.value.description;
    const image = this.form.value.image as File;  // Extract the File object
    // if(image){
    //   this.taskService.addTask(description, image).subscribe(d => {
    //     this.getAllTasks();
    //     this.form.reset();
    //   });
    //   return
    // }
    this.taskService.addTask(description).subscribe(d => {
      this.getAllTasks();
      this.form.reset();
    });
  }

  deleteTask(id: string){
    if(id){
      this.taskService.deleteTask(id).subscribe(d => this.getAllTasks())
    }
  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({image: file});
    this.form.get('image')?.updateValueAndValidity();
    console.log(file)
    console.log(this.form)
  }

}
