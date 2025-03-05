import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MusicView from '../views/MusicView.vue'
import SoloMusicView from '../views/MusicViews/SoloMusicView.vue'
import ScoresMusicView from '../views/MusicViews/ScoresMusicView.vue'
import PathNotFound from '../views/PathNotFound.vue'
import AboutView from  '../views/AboutView.vue'
import AcademicsView from '../views/AcademicsView.vue'
import AlbumPage from '../components/AlbumPage.vue'
import CVView from '../views/CVView.vue'

export const routes = [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {home: true}
    },
    {
      path: '/work',
      name: 'Work',
      component: AcademicsView,
    },
    {
      path: '/music',
      name: 'Music',
      component: MusicView,
      redirect: '/music/solo',
      meta: {music: true},
      children: [
        {
          name: 'Solo',
          path: 'solo',
          component: SoloMusicView,
          hideChildren: true,
        },
        {
          name: 'Scores',
          path: 'scores',
          component: ScoresMusicView
        },
        // {
        //   name: 'Other',
        //   path: 'other',
        //   component: OtherMusicView
        // },
        {
          path: 'solo/:path',
          component: AlbumPage,
          hide: true,
          props: true,
          meta: { albumIndex: '/assets/music/solo/index.json' }
        },
        {
          path: 'scores/:path',
          component: AlbumPage,
          hide: true,
          props: true,
          meta: { albumIndex: '/assets/music/scores/index.json' }
        }
      ]
    },
    // {
    //   path: '/blog',
    //   name: 'Blog',
    //   component: BlogView,
    //   hideChildren: true, 
    //   children: [
    //     {
    //       name: 'Blog',
    //       path: '',
    //       component: BlogMenu
    //     },
    //     {
    //       path: ':path',
    //       component: ArticlePage,
    //       props: true
    //     }
    //    ]
    // },
    {
      path: '/cv',
      name: 'CV/Resume',
      component: CVView,
      hide: true,
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView,
    },
    { path: '/:pathMatch(.*)*', component: PathNotFound },
  ]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})



export default router
