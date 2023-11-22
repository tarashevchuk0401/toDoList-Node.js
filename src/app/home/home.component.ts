import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Task } from '../models/task.model';
import { from, map } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  allTasks: Task[] = [];
  form!: FormGroup;

  constructor(
    private httpService: HttpService,
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
    this.httpService.getAllTasks()
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
  //   this.httpService.addTask(task.description, task.image).subscribe(d => {
  //     this.getAllTasks()
  //     this.form.reset();
  //   })
  // }

  addNewTask() { 
    const description = this.form.value.description;
    const image = this.form.value.image as File;  // Extract the File object
    // if(image){
    //   this.httpService.addTask(description, image).subscribe(d => {
    //     this.getAllTasks();
    //     this.form.reset();
    //   });
    //   return
    // }
    this.httpService.addTask(description).subscribe(d => {
      this.getAllTasks();
      this.form.reset();
    });
  }

  deleteTask(id: string){
    if(id){
      this.httpService.deleteTask(id).subscribe(d => this.getAllTasks())
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
