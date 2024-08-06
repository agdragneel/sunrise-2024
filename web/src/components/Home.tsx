import { useEffect, useState } from 'react';
import { Button, Container, Grid, Typography, Badge, Box } from '@mui/material';
import Task from '@/model/Task';
import { useTheme } from '@/context/ThemeContext';
import { getActiveTasks, getCompletedTasks, getAllTasks, completeTask } from '@/modules/taskManager';
import TaskCard from '@/components/TaskCard';
import { keyframes } from '@mui/system';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Home: React.FC = () => {
  const [todo, setTodo] = useState<Task[]>([]);
  const [inProgress, setInProgress] = useState<Task[]>([]);
  const [completed, setCompleted] = useState<Task[]>([]);
  const { toggleTheme, isDarkMode } = useTheme();

  useEffect(() => {
    async function fetchTasks() {
      const allTasks = getAllTasks();
      updateColumns(allTasks);
    }
    fetchTasks();
  }, []);

  const updateColumns = (tasks: Task[]) => {
    const activeTasks = getActiveTasks();
    const completedTasks = getCompletedTasks();
    const todoTasks = tasks.filter(task => !task.completed && !activeTasks.includes(task));

    const sortedActiveTasks = activeTasks.toSorted((a, b) => a.group - b.group || a.id - b.id);
    const sortedTodoTasks = todoTasks.toSorted((a, b) => a.group - b.group || a.id - b.id);

    setInProgress(sortedActiveTasks);
    setCompleted(completedTasks);
    setTodo(sortedTodoTasks);
  };

  const handleComplete = async (task: Task) => {
    try {
      completeTask(task.title);
      const allTasks = getAllTasks();
      updateColumns(allTasks);
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const isEmpty = todo.length === 0 && inProgress.length === 0;

  return (
    <Container sx={{ marginTop: 4, animation: `${fadeIn} 0.5s ease-in` }}>
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
          <Typography variant="h6" gutterBottom>
            To-Do
            <Badge badgeContent={todo.length} color="primary" sx={{ ml: 2 }} />
          </Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap', animation: `${fadeIn} 0.5s ease-in` }}>
            {todo.map(task => (
              <TaskCard key={task.id} task={task} isInProgress={false} onComplete={handleComplete} />
            ))}
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            In-Progress
            <Badge badgeContent={inProgress.length} color="secondary" sx={{ ml: 2 }} />
          </Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap', animation: `${fadeIn} 0.5s ease-in` }}>
            {inProgress.map(task => (
              <TaskCard key={task.id} task={task} isInProgress={true} onComplete={handleComplete} />
            ))}
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Completed
            <Badge badgeContent={completed.length} color="success" sx={{ ml: 2 }} />
          </Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap', animation: `${fadeIn} 0.5s ease-in` }}>
            {completed.map(task => (
              <TaskCard key={task.id} task={task} isInProgress={false} onComplete={handleComplete} />
            ))}
          </div>
        </Grid>
      </Grid>
      {isEmpty && (
        <>
          <Box
            sx={{
              position: 'fixed',
              left: 16,
              bottom: 16,
              backgroundColor: 'background.paper',
              padding: 2,
              borderRadius: 1,
              boxShadow: 3,
              animation: `${fadeIn} 0.5s ease-in`,
              zIndex: 1,
              '@media (max-width: 600px)': {
                display: 'none',
              },
            }}
          >
            <Typography variant="h6" color="success.main" sx={{ animation: `${fadeIn} 0.5s ease-in` }}>
              🎉 Congratulations! All tasks are complete!
            </Typography>
          </Box>
          <Box
            sx={{
              position: 'fixed',
              left: '20%',
              top: '10%',
              fontSize: '25rem',
              zIndex: -1,
              opacity: 0.5,
              filter: 'grayscale(100%)',
              '@media (max-width: 600px)': {
                display: 'none',
              },
            }}
          >
            🎉
          </Box>
          <Box
            sx={{
              position: 'fixed',
              left: '20%',
              top: '20%',
              zIndex: 0,
              opacity: 0.5,
              '@media (max-width: 600px)': {
                display: 'none',
              },
            }}
          >
            <Typography color="grey" variant="h4" sx={{
              animation: `${fadeIn} 0.5s ease-in`,
              position: 'fixed',
              left: '24%',
              top: '85%',
              fontSize: '1.4rem'
            }}>
              You are all caught up!
            </Typography>
          </Box>
        </>
      )}
    </Container>
  );
}

export default Home;
