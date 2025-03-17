import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index < 0) throw new NotFoundException('Task not found!!!!');

    return this.tasks[index];
  }

  createTask(task: Task): Task {
    this.tasks.push({
      id: this.tasks.length + 1 + '',
      ...task
    });

    return this.tasks[this.tasks.length - 1];
  }

  updateTask(id: string, update: Task): Task {
    const index = this.tasks.findIndex(task=> task.id === id);

    if (index < 0) throw new NotFoundException('Task to update is not found!');

    this.tasks[index] = update;
    this.tasks[index].id = id;

    return this.tasks[index];
  }

  deleteTask(id: string): Task {
    const index = this.tasks.findIndex(task=> task.id === id);

    if (index < 0) throw new NotFoundException('Task to delete is not found!');

    const deletedTask = this.tasks[index];

    this.tasks.splice(index, 1);

    return deletedTask;
  }
}
