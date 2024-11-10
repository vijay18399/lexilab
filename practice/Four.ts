import { Component } from '@angular/core';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  template: `
    <div>
      <input [(ngModel)]="newTask" placeholder="Add a new task" />
      <button (click)="addTask()">Add</button>
      <ul>
        <li *ngFor="let task of tasks">
          <span [class.completed]="task.completed">{{ task.title }}</span>
          <button (click)="toggleComplete(task.id)">Complete</button>
          <button (click)="removeTask(task.id)">Remove</button>
        </li>
      </ul>
    </div>
  `,
  styles: ['.completed { text-decoration: line-through; }']
})
export class Four {
  newTask: string = '';
  tasks: Task[] = [];

  addTask(): void {
    if (this.newTask.trim()) {
      this.tasks.push({ id: Date.now(), title: this.newTask, completed: false });
      this.newTask = '';
    }
  }

  toggleComplete(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) task.completed = !task.completed;
  }

  removeTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }
}
