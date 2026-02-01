import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { AddTeam } from './components/add-team/add-team';
import { GetTeams } from './components/get-teams/get-teams';
import { GetProjects } from './components/get-projects/get-projects';
import { AddProject } from './components/add-project/add-project';
import { GetTasks } from './components/get-tasks/get-tasks';
import { AddTask } from './components/add-task/add-task';
import { UpdateTask } from './components/update-task/update-task';
import { AddComment } from './components/add-comment/add-comment';
import { Logout } from './components/logout/logout';
import { authGuard } from './guards/auth';

export const routes: Routes = [
    {path:'',component:Login},
    {path:'register',component:Register},
    {path:'login',component:Login},
    {path:'logout',component:Logout,canActivate:[authGuard]},
    {path:'team/new',component:AddTeam,canActivate:[authGuard]},
    {path:'team',component:GetTeams,canActivate:[authGuard]},
    {path:'project',component:GetProjects,canActivate:[authGuard]},
    {path:'project/new',component:AddProject,canActivate:[authGuard]},
    {path:'project/:teamId/projects',component:GetProjects,canActivate:[authGuard]},
    {path:'project/:projectId/tasks',component:GetTasks,canActivate:[authGuard]},
    {path:'task',component:GetTasks,canActivate:[authGuard]},
    {path:'task/new',component:AddTask,canActivate:[authGuard]},
    {path:'task/:taskId/update',component:UpdateTask,canActivate:[authGuard]},
    {path:'comment/new',component:AddComment,canActivate:[authGuard]},
];
