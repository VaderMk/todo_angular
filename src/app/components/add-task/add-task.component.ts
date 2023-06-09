import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit{

  task: Task = {
    title: '',
    description: '',
    dueDate: '',
    finished: false
  };

  submited = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
  }

  saveTask(): void {
    const data = {
      title: this.task.title,
      description: this.task.description
    };

    this.taskService.create(data)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.submited = true;
      },
      error: (e) => console.error(e)
    });
  }

  newTask(): void {
    this.submited = false;
    this.task = {
      title: '',
      description: '',
      dueDate: '',
      finished: false
    }
  }
}
