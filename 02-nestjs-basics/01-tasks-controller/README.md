# Задание: Создание контроллера для CRUD операций с задачами

В этом задании вы создадите свой первый контроллер в NestJS, который будет обрабатывать CRUD (Create, Read, Update,
Delete) операции с задачами. Это поможет вам освоить базовые принципы работы с NestJS, включая маршрутизацию, обработку
запросов и работу с данными.

---

## Общая структура задачи

Контроллер должен предоставлять следующие функции:

1. Создание задачи – добавление новой задачи.
2. Получение списка задач – возвращение всех существующих задач.
3. Получение задачи по идентификатору – получение подробной информации о задаче.
4. Обновление задачи – изменение существующей задачи.
5. Удаление задачи – удаление задачи по идентификатору.

---

### Создание задачи

| Метод | Ссылка | Описание             | Параметры |
| ----- | ------ | -------------------- | --------- |
| POST  | /tasks | Создать новую задачу | -         |

Пример запроса:

```json
POST http://localhost:3000/tasks
{
  "title": "Сделать домашнюю работу",
  "description": "Завершить домашнюю работу по программированию",
  "status": "in_progress"
}
```

Пример ответа:

```json
{
  "id": "1",
  "title": "Сделать домашнюю работу",
  "description": "Завершить домашнюю работу по программированию",
  "status": "in_progress"
}
```

---

### Получение списка задач

| Метод | Ссылка | Описание              | Параметры |
| ----- | ------ | --------------------- | --------- |
| GET   | /tasks | Получить список задач | -         |

Пример запроса:

```
GET http://localhost:3000/tasks
```

Пример ответа:

```json
[
  {
    "id": "1",
    "title": "Сделать домашнюю работу",
    "description": "Завершить домашнюю работу по программированию",
    "status": "in_progress"
  },
  {
    "id": "2",
    "title": "Купить продукты",
    "description": "Купить молоко и хлеб",
    "status": "completed"
  }
]
```

---

### Получение задачи по идентификатору

| Метод | Ссылка     | Описание                          | Параметры |
| ----- | ---------- | --------------------------------- | --------- |
| GET   | /tasks/:id | Получить задачу по идентификатору |           |

Пример запроса:

```
GET http://localhost:3000/tasks/1
```

Пример ответа:

```json
{
  "id": "1",
  "title": "Сделать домашнюю работу",
  "description": "Завершить домашнюю работу по программированию",
  "status": "in_progress"
}
```

Если задача с переданным идентификатором не существует, вернуть ошибку `404`.

---

### Обновление задачи

| Метод | Ссылка     | Описание                     | Параметры |
| ----- | ---------- | ---------------------------- | --------- |
| PATCH | /tasks/:id | Обновить существующую задачу |           |

Пример запроса:

```json
PATCH http://localhost:3000/tasks/1
{
  "title": "Сделать домашнюю работу",
  "description": "Обновленное описание",
  "status": "completed"
}
```

Пример ответа:

```json
{
  "id": "1",
  "title": "Сделать домашнюю работу",
  "description": "Обновленное описание",
  "status": "completed"
}
```

Если задача с переданным идентификатором не существует, вернуть ошибку `404`.

---

### Удаление задачи

| Метод  | Ссылка     | Описание                         | Параметры |
| ------ | ---------- | -------------------------------- | --------- |
| DELETE | /tasks/:id | Удалить задачу по идентификатору |           |

Пример запроса:

```
DELETE http://localhost:3000/tasks/1
```

Пример ответа:

```json
{
  "id": "1",
  "title": "Сделать домашнюю работу",
  "description": "Завершить домашнюю работу по программированию",
  "status": "pending"
}
```

Если задача с переданным идентификатором не существует, вернуть ошибку `404`.

---

## Инструкции

1. Реализуйте CRUD-методы в контроллере и сервисе:
   - В `TasksService` реализуйте методы для управления задачами: `createTask`, `getAllTasks`, `getTaskById`, `updateTask`, `deleteTask`.
   - В `TasksController` вызовите эти методы в соответствующих обработчиках маршрутов.

---

## Дополнительные (опциональные) задачи

1. Валидация входных данных:

   - Используйте декораторы из `@nestjs/class-validator`, чтобы валидировать входные данные, например:
     - `title` и `description` – обязательные строки.
     - `status` – допустимые значения: `in_progress`, `completed`, `pending`.

2. Обработка ошибок:
   - Возвращайте статус `404` для несуществующих задач.
   - Возвращайте статус `400` для некорректных запросов.
