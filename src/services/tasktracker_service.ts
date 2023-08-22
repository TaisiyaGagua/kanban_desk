export class TaskTrackerService {
  incrementActiveTasks(key: string) {
    let currentValue = localStorage.getItem(key);
    if (!currentValue || currentValue === null) {
      localStorage.setItem(key, '0');
    }
    // ! - используется для того, чтобы показать TS, что value не null
    let numberValue = +currentValue! + 1;
    localStorage.setItem(key, numberValue.toString());
  }
  decrementActiveTasks(key: string) {
    let currentValue = localStorage.getItem(key);
    if (!currentValue || currentValue === null) {
      localStorage.setItem(key, '0');
    }
    // ! - используется для того, чтобы показать TS, что value не null
    let numberValue = +currentValue! - 1;
    localStorage.setItem(key, numberValue.toString());
  }
  getTasks(key: string): number {
    const serealisedTasks = localStorage.getItem(key);
    if (serealisedTasks) {
      return JSON.parse(serealisedTasks) as number;
    }
    return 0;
  }
}
