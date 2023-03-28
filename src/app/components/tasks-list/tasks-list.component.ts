import { Component, OnInit} from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit{

  tasks?: Task[];
  currentTask: Task = {};
  currentIndex = -1;
  title = '';
  description= '';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
      this.retriveTasks();
  }

  retriveTasks(): void {
    this.taskService.getAll()
    .subscribe({
      next: (data) => {
        this.tasks = data;
        console.log(data)
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.retriveTasks();
    this.currentTask = {};
    this.currentIndex = -1;
  }

  setActiveTask(task: Task, index: number): void {
    this.currentTask = task;
    this.currentIndex = index;
  }

  removeAllTasks(): void {
    this.taskService.deleteAll()
    .subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  searchTitle(): void {
    this.currentTask = {};
    this.currentIndex = -1;

    this.taskService.findByTitle(this.title)
    .subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  searchDescription():void{
    this.currentTask = {};
    this.currentIndex = -1;

    this.taskService.findByDescription(this.description)
    .subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
}
