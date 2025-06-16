import TasksPage from '@/components/pages/TasksPage';
import ArchivedTasksPage from '@/components/pages/ArchivedTasksPage';

export const routes = {
  tasks: {
    id: 'tasks',
    label: 'Tasks',
    path: '/tasks',
    icon: 'CheckSquare',
    component: TasksPage
  },
  archived: {
    id: 'archived',
    label: 'Archived',
    path: '/archived',
    icon: 'Archive',
    component: ArchivedTasksPage
  }
};

export const routeArray = Object.values(routes);