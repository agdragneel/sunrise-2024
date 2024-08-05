// components/TaskBoard.tsx
import React from 'react';
import { Grid, Typography, Badge, Container, Button } from '@mui/material';
import { Task } from '@/model/Task';
import TaskCard from './TaskCard';

interface TaskBoardProps {
  todo: Task[];
  inProgress: Task[];
  completed: Task[];
  onCompleteTask: (task: Task) => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const TaskBoard: React.FC<TaskBoardProps> = ({
  todo,
  inProgress,
  completed,
  onCompleteTask,
  toggleTheme,
  isDarkMode,
}) => (
  <Container sx={{ marginTop: 4 }}>
    <Typography variant="h4" gutterBottom>
      Taskboard
      <Button
        onClick={toggleTheme}
        sx={{
          marginLeft: 2,
          fontSize: 24,
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          '&:hover': {
            opacity: 0.7,
          },
        }}
      >
        {isDarkMode ? '🌞' : '🌙'}
      </Button>
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Typography variant="h6" gutterBottom >
          To-Do
          <Badge
            badgeContent={todo.length}
            color="primary"
            sx={{ ml: 2 }} // Increased margin to add spacing
          />
        </Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {todo.map(task => (
            <TaskCard key={task.id} task={task} onComplete={() => onCompleteTask(task)} />
          ))}
        </div>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h6" gutterBottom>
          In-Progress
          <Badge
            badgeContent={inProgress.length}
            color="secondary"
            sx={{ ml: 2 }} // Increased margin to add spacing
          />
        </Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {inProgress.map(task => (
            <TaskCard key={task.id} task={task} onComplete={() => onCompleteTask(task)} />
          ))}
        </div>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h6" gutterBottom>
          Completed
          <Badge
            badgeContent={completed.length}
            color="success"
            sx={{ ml: 2 }} // Increased margin to add spacing
          />
        </Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {completed.map(task => (
            <TaskCard key={task.id} task={task} onComplete={() => onCompleteTask(task)} />
          ))}
        </div>
      </Grid>
    </Grid>
  </Container>
);

export default TaskBoard;
