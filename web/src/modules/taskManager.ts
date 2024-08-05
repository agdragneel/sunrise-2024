import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";



let tasks: Task[] = [...initialTasks];



export function initializeTasks() {
    //Initialize tasks Array with initialTasks from provided TaskList
    tasks = [...initialTasks];
}

function checkActive(task: Task): boolean {
    
    // Get tasks with group number less than current task
    const lowerGroupTasks = tasks.filter(t => t.group < task.group);

    // Check if all the filtered tasks are completed
    const allCompleted = lowerGroupTasks.every(t => t.completed);

    return allCompleted;
  }

export function getActiveTasks(): Task[] {

    //From tasks array, select tasks that are active and not completed.
    return tasks.filter(task => !task.completed && checkActive(task));
}

export function getCompletedTasks(): Task[] {
   //Select completed tasks from tasks array  
    return tasks.filter(task => task.completed);
}

export function getAllTasks(): Task[] {
    return tasks;
}

export function completeTask(taskTitle: string): void {
    const taskIndex = tasks.findIndex(task => task.title === taskTitle);
  if (taskIndex > -1) {
    tasks[taskIndex].completed = true; 
  } 
}

export function createTask(title: string, description: string, persona: string, group: number): void {
    const newTaskId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    const newTask = new Task(newTaskId, title, description, persona, group);
    tasks.push(newTask);
}

export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex > -1) {
      tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    }
}

export function deleteTask(taskId: number): void {
    tasks = tasks.filter(task => task.id !== taskId);
}


