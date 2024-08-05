import type { NextApiRequest, NextApiResponse } from 'next';
import { Task } from '@/model/Task';
import { initialTasks } from '@/utils/TaskList';

let tasks: Task[] = [...initialTasks];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    // Find and mark the task as completed
    const taskIndex = tasks.findIndex(task => task.title === title);
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    tasks[taskIndex].completed = true;

    // Send updated tasks list as a response
    res.status(200).json(tasks);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
