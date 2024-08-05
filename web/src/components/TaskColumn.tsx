// components/TaskColumn.tsx
import React from 'react';
import { Typography, Badge, Card, CardContent, CardActions, Button, Divider } from '@mui/material';
import { Task } from '@/model/Task';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  badgeColor: 'primary' | 'secondary' | 'success';
  badgeCount: number;
  onCompleteTask: (task: Task) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks, badgeColor, badgeCount, onCompleteTask }) => {
  const renderTaskCard = (task: Task) => (
    <Card 
      sx={{ 
        borderRadius: 2, 
        boxShadow: 3, 
        margin: 1, 
        width: 'calc(50% - 16px)', 
        display: 'inline-block',
        opacity: 0.9, 
        transition: 'opacity 0.3s ease-in-out',
        '&:hover': {
          opacity: 1, 
        },
      }}
      key={task.id}
    >
      <CardContent sx={{ position: 'relative' }}>
        {title === 'In-Progress' && (
          <CardActions>
            <Button 
              size="small" 
              onClick={() => onCompleteTask(task)} 
              color="primary"
              sx={{ 
                '&:hover': {
                  backgroundColor: 'primary.dark',
                  color: 'white',
                },
                transition: 'background-color 0.3s ease-in-out',
              }}
            >
              ✓ Done
            </Button>
          </CardActions>
        )}
        <Typography variant="h6">Task {task.id}</Typography>
        <Typography variant="h5" gutterBottom>{task.title}</Typography>
        <Typography variant="body2" color="text.secondary">{task.description}</Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body2" color="text.secondary">Role: {task.persona}</Typography>
      </CardContent>
    </Card>
  );

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        {title}
        <Badge badgeContent={badgeCount} color={badgeColor} sx={{ ml: 2 }} />
      </Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {tasks.map(renderTaskCard)}
      </div>
    </div>
  );
};

export default TaskColumn;
