import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto, Task, TaskStatus, UpdateTaskDto } from "./task.model";
import { NotificationsService } from "../notifications/notifications.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly usersService: UsersService,
  ) {}


  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description, assignedTo } = createTaskDto;
    const task: Task = {
      id: (this.tasks.length + 1).toString(),
      title,
      description,
      status: TaskStatus.Pending,
      assignedTo,
    };
    this.tasks.push(task);

    const user = this.usersService.getUserById(assignedTo)
    const emailMessage = `Вы назначены ответственным за задачу: "${task.title}"`;
    this.notificationsService.sendEmail(user.email, 'Новая задача', emailMessage);

    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Задача с ID ${id} не найдена`);
    }

    Object.assign(task, updateTaskDto);

    const userId = task.assignedTo;
    const user = this.usersService.getUserById(userId);

    const smsMessage = `Статус задачи "${task.title}" обновлён на "${task.status}"`;
    this.notificationsService.sendSMS(user.phone, smsMessage);

    return task;
  }
}
