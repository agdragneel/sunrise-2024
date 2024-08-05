import type { NextApiRequest, NextApiResponse } from 'next';
import { getActiveTasks, getCompletedTasks, getAllTasks, createTask, updateTask, deleteTask, initializeTasks } from '@/modules/taskManager';

// Initialize tasks once when the server starts
initializeTasks();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      if (req.query.type === 'active') {
        res.status(200).json(getActiveTasks());
      } else if (req.query.type === 'completed') {
        res.status(200).json(getCompletedTasks());
      } else {
        res.status(200).json(getAllTasks());
      }
      break;
    case 'POST':
      createTask(req.body.title, req.body.description, req.body.persona, req.body.group);
      res.status(201).end();
      break;
    case 'PUT':
      updateTask(req.body.id, req.body);
      res.status(200).end();
      break;
    case 'DELETE':
      deleteTask(Number(req.query.id));
      res.status(204).end();
      break;
    default:
      res.status(405).end(); // Method Not Allowed
  }
}
