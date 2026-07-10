import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
      meta: {home: true}
    },
    {
      path: '/work',
      name: 'Work',
      component: () => import('../views/AcademicsView.vue'),
      sections: [
        { name: 'Positions', hash: 'positions', omit: true },
        { name: 'Documents', hash: 'documents' },
        { name: 'Publications', hash: 'publications' },
      ]
    },
    {
      path: '/music',
      name: 'Music',
      component: () => import('../views/MusicView.vue'),
      sections: [
        { name: 'Other', hash: 'other' },
        { name: 'Solo', hash: 'solo-music' },
      ],
      children: [
        {
          path: '',
          component: () => import('../views/MusicViews/SoloMusicView.vue'),
          hide: true,
        },
        {
          path: 'solo/:path',
          component: () => import('../components/AlbumPage.vue'),
          hide: true,
          props: true,
          meta: { albumIndex: '/assets/music/solo/index.json' }
        },
      ]
    },
    {
      path: '/cv',
      name: 'CV/Resume',
      component: () => import('../views/CVView.vue'),
      hide: true,
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutView.vue'),
      sections: [
        { name: 'About', hash: 'about', omit: true },
      ]
    },
    { path: '/:pathMatch(.*)*', component: () => import('../views/PathNotFound.vue') },
  ]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  }
})



export default router
