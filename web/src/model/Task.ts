//new Task(1, 'Initial Setup', 'Set up the development environment.', 'Intern', 1),

export default class Task {
    id: number;
    title: string;
    description: string;
    persona: string;
    group: number;
    completed: boolean;
  
    constructor(id: number, title: string, description: string, persona: string, group: number, completed: boolean = false) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.persona = persona;
      this.group = group;
      this.completed = completed;
    }
  }
  