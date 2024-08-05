import { useEffect, useState } from 'react';
import { Button, Container, Grid, Typography, Badge, Box } from '@mui/material';
import { Task } from '@/model/Task';
import { useTheme } from '@/context/ThemeContext'; // Import the useTheme hook
import { getActiveTasks, getCompletedTasks, getAllTasks, completeTask } from '@/modules/taskManager'; // Import task manager functions
import TaskCard from '@/components/TaskCard'; // Import the TaskCard component
import { keyframes } from '@mui/system';

// Define keyframes for smooth transitions
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Home: React.FC = () => {
  const [todo, setTodo] = useState<Task[]>([]);
  const [inProgress, setInProgress] = useState<Task[]>([]);
  const [completed, setCompleted] = useState<Task[]>([]);
  const { toggleTheme, isDarkMode } = useTheme(); // Use the theme hook

  useEffect(() => {
    async function fetchTasks() {
      // Fetch all tasks initially
      const allTasks = getAllTasks();
      updateColumns(allTasks);
    }
    fetchTasks();
  }, []);

  const updateColumns = (tasks: Task[]) => {
    // Get active tasks (In-Progress) and completed tasks
    const activeTasks = getActiveTasks();
    const completedTasks = getCompletedTasks();
    const todoTasks = tasks.filter(task => !task.completed && !activeTasks.includes(task));
    
    // Sort tasks to ensure they are displayed correctly
    setInProgress(activeTasks.sort((a, b) => a.group - b.group || a.id - b.id));
    setCompleted(completedTasks);
    setTodo(todoTasks.sort((a, b) => a.group - b.group || a.id - b.id));
  };

  const handleComplete = async (task: Task) => {
    try {
      completeTask(task.title); // Use the task manager function to complete the task

      // Fetch and update task columns
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
            <Badge
              badgeContent={todo.length}
              color="primary"
              sx={{ ml: 2 }} // Increased margin to add spacing
            />
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
            <Badge
              badgeContent={inProgress.length}
              color="secondary"
              sx={{ ml: 2 }} // Increased margin to add spacing
            />
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
            <Badge
              badgeContent={completed.length}
              color="success"
              sx={{ ml: 2 }} // Increased margin to add spacing
            />
          </Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap', animation: `${fadeIn} 0.5s ease-in` }}>
            {completed.map(task => (
              <TaskCard key={task.id} task={task} isInProgress={false} onComplete={handleComplete} />
            ))}
          </div>
        </Grid>
      </Grid>

      {/* Congratulatory Message and Confetti */}
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
                display: 'none', // Hide on mobile devices
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
              left: '20%', // Centered left on the screen
              top: '10%', // Adjusted to position near the center
              fontSize: '25rem', // Large size
              zIndex: -1,
              opacity: 0.5,
              filter: 'grayscale(100%)',
              '@media (max-width: 600px)': {
                display: 'none', // Hide on mobile devices
              },
            }}
          >
            🎉
          </Box>
          <Box
            sx={{
              position: 'fixed',
              left: '20%', // Centered left on the screen
              top: '20%', // Position below the confetti emoji
              zIndex: 0,
              opacity: 0.5,
              '@media (max-width: 600px)': {
                display: 'none', // Hide on mobile devices
              },
            }}
          >
            <Typography color="grey" variant="h4" sx={{ 
                animation: `${fadeIn} 0.5s ease-in`,
                position: 'fixed',
                left: '24%',
                top: '72%',
                fontSize: '2rem' // Adjusted size for smaller text
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
