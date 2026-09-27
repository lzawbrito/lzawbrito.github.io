import { createRouter, createWebHistory } from 'vue-router'

export const MAIN_PATH = '/main'

// Sections of the single main page. Each entry is an anchor on that page;
// `children` are subsections. Used by the sidebar and the landing page boxes.
export const sections = [
  { name: 'About', hash: 'about' },
  {
    name: 'Science',
    hash: 'science',
    children: [
      { name: 'Documents', hash: 'documents' },
      { name: 'Publications', hash: 'publications' },
    ]
  },
  {
    name: 'Music',
    hash: 'music',
    children: [
      { name: 'Other', hash: 'other' },
      { name: 'Solo', hash: 'solo-music' },
    ]
  },
]

export const routes = [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
      meta: {home: true}
    },
    {
      path: MAIN_PATH,
      name: 'Main',
      component: () => import('../views/MainView.vue'),
    },
    {
      path: '/music/solo/:path',
      component: () => import('../components/AlbumPage.vue'),
      props: true,
      meta: { albumIndex: '/assets/music/solo/index.json' }
    },
    // Old per-section pages redirect to their anchor on the main page
    { path: '/about', redirect: { path: MAIN_PATH, hash: '#about' } },
    { path: '/work', redirect: { path: MAIN_PATH, hash: '#science' } },
    { path: '/science', redirect: { path: MAIN_PATH, hash: '#science' } },
    { path: '/music', redirect: { path: MAIN_PATH, hash: '#music' } },
    {
      path: '/cv',
      name: 'CV/Resume',
      component: () => import('../views/CVView.vue'),
    },
    { path: '/:pathMatch(.*)*', component: () => import('../views/PathNotFound.vue') },
  ]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      // Coming from another page, wait for the main page to render first
      const delay = to.path === from.path ? 0 : 300
      return new Promise((resolve) => {
        setTimeout(() => resolve({ el: to.hash, behavior: 'smooth' }), delay)
      })
    }
    return { top: 0 }
  }
})



export default router
