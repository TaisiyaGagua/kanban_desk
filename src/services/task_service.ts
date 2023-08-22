import { TaskDto } from "../models/task_dto";

class TaskService {
    getTasks(category: string | undefined): TaskDto[] {
        if (category) {
            const serealisedTasks = localStorage.getItem(category);
            if (serealisedTasks) {
                return JSON.parse(serealisedTasks) as TaskDto[];
            }
        }
        return [];
    }

    addTask(category: string, taskDto: TaskDto) {
        let sourceArray = this.getTasks(category);
        sourceArray.push(taskDto);
        localStorage.setItem(category, JSON.stringify(sourceArray));
    }

    transferTask(
        sourceCategory: string,
        targetCategory: string,
        taskDto: TaskDto
    ) {
        let sourceTasks = this.getTasks(sourceCategory);

        const filteredTasks = sourceTasks.filter(
            (task) => task.guid !== taskDto.guid
        );
        localStorage.setItem(sourceCategory, JSON.stringify(filteredTasks));
        this.addTask(targetCategory, taskDto);
    }
    updateTask(
        category: string | undefined,
        guid: string | undefined,
        dto: TaskDto
    ) {
        if (category) {
            let sourceArray = this.getTasks(category);
            let newTasks = sourceArray.map((task) =>
                task.guid === guid
                    ? { ...task, description: dto.description }
                    : task
            );
            localStorage.setItem(category, JSON.stringify(newTasks));
        }
    }
}

export default TaskService;
