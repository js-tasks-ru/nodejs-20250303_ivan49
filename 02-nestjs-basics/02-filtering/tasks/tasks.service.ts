import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getFilteredTasks(
    status?: TaskStatus,
    page?: number,
    limit?: number,
  ): Task[] {
      function splitArrayByLimit(arr: Task[], limit: number) {
        const result = [];
        for (let i = 0; i < arr.length; i += limit) {
          result.push(arr.slice(i, i + limit));
        }
        return result;
      }

      let filteredByStatus = this.tasks;

      if (status && Object.values(TaskStatus).indexOf(status) === -1) {
        throw new BadRequestException('Use correct value for "status" !!!!');
      }

      if (status) filteredByStatus = this.tasks.filter(task => task.status === status);

      if (page && isNaN(Number(page))) {
        throw new BadRequestException('Use number for "page" !!!!');
      }

      if (limit && isNaN(Number(limit))) {
        throw new BadRequestException('Use number for "limit" !!!!');
      }

      if (page && limit) {
        const pageNum = Number(page);
        const limitNum = Number(limit);

        const splitedByPagesList = splitArrayByLimit(filteredByStatus, limitNum);

        if (splitedByPagesList.length < pageNum) return [];

        return splitedByPagesList[pageNum - 1];
      }

      return filteredByStatus;
  }
}
