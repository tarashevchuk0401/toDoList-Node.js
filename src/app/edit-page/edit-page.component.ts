import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../shared/models/task.model';
import { TaskService } from '../shared/services/task.service';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  currentTaskId: string = '';
  currentTask: Task | undefined;
  private routeSubscription = new Subscription;
  private updateSubscription = new Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params
      .pipe(switchMap(params => {
        this.currentTaskId = params['id'];
        return this.taskService.getTaskById(this.currentTaskId);
      }))
      .subscribe(data => {
        this.currentTask = data.task;
      })
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  editTask(description: string) {
    if (this.currentTask) {
      this.currentTask = { ...this.currentTask, description: description };
      this.updateSubscription = this.taskService.updateTask(this.currentTask).subscribe(() => {
        this.router.navigate(['/'])
      });
    }
  }

}
