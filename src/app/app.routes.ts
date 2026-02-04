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
import { authGuard, loginGuard } from './guards/auth';
import { AddMember } from './components/add-member/add-member';
import { Tasks } from './services/tasks';
import { NotFound } from './components/not-found/not-found';

// export const routes: Routes = [
//     {path:'',component:Login},
//     {path:'register',component:Register},
//     {path:'login',component:Login},
//     {path:'logout',component:Logout},
//     {path:'team/new',component:AddTeam},
//     {path:'team',component:GetTeams},
//     {path:'project',component:GetProjects},
//     {path:'project/new',component:AddProject},
//     {path:'project/:teamId/projects',component:GetProjects},
//     {path:'project/:projectId/tasks',component:GetTasks},
//     {path:'task',component:GetTasks},
//     {path:'task/new',component:AddTask},
//     {path:'task/:taskId/update',component:UpdateTask},
//     {path:'comment/new',component:AddComment},
// ];

export const routes: Routes = [
    { path: '', component: Login, canActivate: [loginGuard] },
    { path: '', component: Tasks, canActivate: [authGuard] },
    { path: 'register', component: Register },
    { path: 'login', component: Login },
    { path: 'logout', component: Logout, canActivate: [authGuard] },
    { path: 'teams/new', component: AddTeam, canActivate: [authGuard] },
    { path: 'teams', component: GetTeams, canActivate: [authGuard] },
    { path: 'teams/:teamId/member/new', component: AddMember, canActivate: [authGuard] },
    { path: 'projects', component: GetProjects, canActivate: [authGuard] },
    { path: 'teams/:teamId/projects/new', component: AddProject, canActivate: [authGuard] },
    // { path: 'project/new', component: AddProject, canActivate: [authGuard] },
    { path: 'teams/:teamId/projects', component: GetProjects, canActivate: [authGuard] },
    // { path: 'project/:projectId/tasks', component: GetTasks, canActivate: [authGuard] },
    { path: 'teams/:teamId/projects/:projectId/tasks', component: GetTasks, canActivate: [authGuard] },
    { path: 'tasks', component: GetTasks, canActivate: [authGuard] },
    { path: 'tasks/new', component: AddTask, canActivate: [authGuard] },
    { path: 'teams/:teamId/projects/:projectId/tasks/new', component: AddTask, canActivate: [authGuard] },
    { path: 'tasks/:taskId/update', component: UpdateTask, canActivate: [authGuard] },
    { path: 'teams/:teamId/projects/:projectId/tasks/:taskId/update', component: UpdateTask, canActivate: [authGuard] },
    { path: 'teams/:teamId/projects/:projectId/tasks/:taskId/comments/new', component: AddComment, canActivate: [authGuard] },
    { path: 'tasks/:taskId/comments/new', component: AddComment, canActivate: [authGuard] },
    // { path: 'comments/new', component: AddComment, canActivate: [authGuard] },
    { path: '**',component:NotFound } //אולי לשנות את זה ל404
];
