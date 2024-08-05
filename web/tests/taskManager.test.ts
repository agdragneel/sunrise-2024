// tests/taskManager.test.ts

import { initializeTasks, getActiveTasks, completeTask, getCompletedTasks, getAllTasks, createTask, updateTask, deleteTask } from "@/modules/taskManager";



describe('Task Manager', () => {
  beforeEach(() => {
    initializeTasks();
  });

  test('should create initial task on initialization', () => {
    const activeTasks = getActiveTasks();
    expect(activeTasks).toContainEqual(
      expect.objectContaining({ title: 'Initial Setup' })
    );
  });

  test('should not have Group 2 tasks before completing Group 1', () => {
    completeTask('Initial Setup');
    const activeTasks = getActiveTasks();
    expect(activeTasks).not.toContainEqual(
      expect.objectContaining({ title: 'Basic Git' })
    );
  });

  test('should mark task as completed', () => {
    completeTask('Basic Introduction');
    const completedTasks = getCompletedTasks();
    expect(completedTasks).toContainEqual(
      expect.objectContaining({ title: 'Basic Introduction' })
    );
  });

  test('should fetch active tasks', () => {
    const activeTasks = getActiveTasks();
    expect(activeTasks).toEqual(
      [{"completed": false, "description": "Learn basic Git commands.", "group": 2, "id": 3, "persona": "Intern", "title": "Basic Git"}, {"completed": false, "description": "Collaborate on a Git repository.", "group": 2, "id": 4, "persona": "Intern", "title": "Git Collaboration"}])
      
    ;
  });

  test('should fetch all tasks', () => {
    const allTasks = getAllTasks();
    expect(allTasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'Initial Setup' }),
        expect.objectContaining({ title: 'Basic Introduction' }),
        expect.objectContaining({ title: 'Basic Git' }),
        expect.objectContaining({ title: 'Git Collaboration' }),
        expect.objectContaining({ title: 'JavaScript Basics' }),
        expect.objectContaining({ title: 'JavaScript Project' }),
        expect.objectContaining({ title: 'API Introduction' }),
        expect.objectContaining({ title: 'API Consumption' }),
        expect.objectContaining({ title: 'Final Project' }),
        expect.objectContaining({ title: 'Project Presentation' })

      ])
    );
  });

  test('should fetch completed tasks', () => {
    completeTask('Basic Introduction');
    const completedTasks = getCompletedTasks();
    expect(completedTasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'Basic Introduction' })
      ])
    );
  });

  test('should create a new task', () => {
    createTask('New Task', 'New task description', 'Intern', 1);
    const activeTasks = getActiveTasks();
    expect(activeTasks).toContainEqual(
      expect.objectContaining({ title: 'New Task' })
    );
  });

  test('should update a task', () => {
    const taskToUpdate = getActiveTasks()[0];
    updateTask(taskToUpdate.id, { title: 'Updated Task Title' });
    const updatedTask = getAllTasks().find(task => task.id === taskToUpdate.id);
    expect(updatedTask?.title).toBe('Updated Task Title');
  });

  test('should delete a task', () => {
    const taskToDelete = getActiveTasks()[0];
    deleteTask(taskToDelete.id);
    const activeTasks = getActiveTasks();
    expect(activeTasks).not.toContainEqual(
      expect.objectContaining({ id: taskToDelete.id })
    );
  });

  test('should enforce task completion order', () => {
    completeTask('Initial Setup');
    completeTask('Basic Introduction');
    const activeTasks = getActiveTasks();
    expect(activeTasks).toContainEqual(
      expect.objectContaining({ title: 'Basic Git' })
    );
  });
});

//Additional Unit Tests

describe('Task Manager Additional Tests', () => {
  beforeEach(() => {
    initializeTasks();
  });

  test('should handle duplicate task titles', () => {
    // Create two tasks with the same title
    createTask('Duplicate Task', 'Description 1', 'Intern', 1);
    createTask('Duplicate Task', 'Description 2', 'Intern', 2);

    const activeTasks = getActiveTasks();
    expect(activeTasks).toContainEqual(
      expect.objectContaining({ title: 'Duplicate Task', description: 'Description 1' })
    );
    expect(activeTasks).not.toContainEqual(
      expect.objectContaining({ title: 'Duplicate Task', description: 'Description 2' })
    );
  });

  test('should not update a task with invalid ID', () => {
    // Try updating a task with an invalid ID
    updateTask(999, { title: 'Invalid Task Title' });
    const allTasks = getAllTasks();
    expect(allTasks).not.toContainEqual(
      expect.objectContaining({ title: 'Invalid Task Title' })
    );
  });

  test('should not delete a task with invalid ID', () => {
    // Try deleting a task with an invalid ID
    deleteTask(999);
    const allTasks = getAllTasks();
    expect(allTasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'Initial Setup' }),
        expect.objectContaining({ title: 'Basic Introduction' }),
        expect.objectContaining({ title: 'Basic Git' }),
        expect.objectContaining({ title: 'Git Collaboration' }),
        expect.objectContaining({ title: 'JavaScript Basics' }),
        expect.objectContaining({ title: 'JavaScript Project' }),
        expect.objectContaining({ title: 'API Introduction' }),
        expect.objectContaining({ title: 'API Consumption' }),
        expect.objectContaining({ title: 'Final Project' }),
        expect.objectContaining({ title: 'Project Presentation' })
      ])
    );
  });

  

  test('should create and retrieve a new task', () => {
    // Create a new task
    createTask('New Task', 'New task description', 'Intern', 1);
    const activeTasks = getActiveTasks();
    const allTasks = getAllTasks();

    expect(activeTasks).toContainEqual(
      expect.objectContaining({ title: 'New Task' })
    );
    expect(allTasks).toContainEqual(
      expect.objectContaining({ title: 'New Task' })
    );
  });
});