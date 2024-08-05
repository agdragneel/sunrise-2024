import { Button, Card, CardContent, Divider, Typography, Box } from '@mui/material';
import { Task } from '@/model/Task';
import { keyframes } from '@mui/system';

// Define keyframes for smooth transitions
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(20px); }
  to { transform: translateY(0); }
`;

interface TaskCardProps {
  task: Task;
  isInProgress: boolean;
  onComplete: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, isInProgress, onComplete }) => (
  <Card 
    sx={{ 
      borderRadius: 2, 
      boxShadow: 3, 
      margin: 1, 
      width: 'calc(50% - 16px)', // Increased width for better fit
      display: 'inline-block',
      opacity: 0.9, // Transparency
      transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
      animation: `${fadeIn} 0.5s ease-in`,
      '&:hover': {
        opacity: 1, // Fully opaque on hover
        transform: 'scale(1.05)', // Slightly scale up on hover
      },
    }}
  >
    <CardContent sx={{ position: 'relative', animation: `${slideIn} 0.5s ease-in` }}>
      <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
        {isInProgress && (
          <Button 
            size="small" 
            onClick={() => onComplete(task)} 
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
        )}
      </Box>
      <Typography variant="h6">Task {task.id}</Typography>
      <Typography variant="h5" gutterBottom>{task.title}</Typography>
      <Typography variant="body2" color="text.secondary">{task.description}</Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant="body2" color="text.secondary">Role: {task.persona}</Typography>
    </CardContent>
  </Card>
);

export default TaskCard;
