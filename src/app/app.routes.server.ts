import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'teams/:teamId/member/new',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [{ teamId: '1' }];
    }
  },
    {
    path: 'teams/:teamId/projects/new',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [{ teamId: '1' }];
    }
  },
    {
    path: 'teams/:teamId/projects',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [{ teamId: '1' }];
    }
  },
    {
    path: 'teams/:teamId/projects/:projectId/tasks',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [{ teamId: '1' }];
    }
  },
      {
    path: 'teams/:teamId/projects/:projectId/tasks/new',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [{ teamId: '1' }];
    }
  },
      {
    path: 'tasks/:taskId/update',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [{ teamId: '1' }];
    }
  },
      {
    path: 'teams/:teamId/projects/:projectId/tasks/:taskId/update',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [{ teamId: '1' }];
    }
  },
        {
    path: 'teams/:teamId/projects/:projectId/tasks/:taskId/comments/new',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [{ teamId: '1' }];
    }
  },
        {
    path: 'tasks/:taskId/comments/new',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [{ teamId: '1' }];
    }
  },
  // {
  //   path: 'project/:projectId/tasks',
  //   renderMode: RenderMode.Prerender,
  //   getPrerenderParams: async () => {
  //     return [{ projectId: '1' }];
  //   }
  // },
  // {
  //   path: 'task/:taskId/update',
  //   renderMode: RenderMode.Prerender,
  //   getPrerenderParams: async () => {
  //     return [{ taskId: '1' }];
  //   }
  // },
  // {
  //   path: 'team/:this.teamId/member/new',
  //   renderMode: RenderMode.Prerender,
  //   getPrerenderParams: async () => {
  //     return [{ teamId: '1' }];
  //   }
  // },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
