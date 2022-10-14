// import Vue from 'vue'
import VueRouter from 'vue-router'
import {useUsers} from "@/store/User";


// const userStore = useUsers()
// Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'default',
    meta:{requiresAuth: false},
  },
  {
    path: '/landing',
    name: 'landing',
    component: () => import(/* webpackChunkName: "landing" */ '@/views/LandingPage'),
    meta:{
      requiresAuth:false,
      displayName:'Pantalla principal'
    }
  },
  {
    path: '/register',
    name: 'register',
    component:() => import(/* webpackChunkName: "register1" */ '@/views/RegisterView'),
    meta:{
      requiresAuth:false,
      displayName: 'Registro'
    }
  },
  {
    path: '/login',
    name: 'login',
    component:() => import(/* webpackChunkName: "login" */ '@/views/LoginView'),
    meta:{
      requiresAuth:false,
      displayName: 'Inicio de sesión'
    }
  },
  {
    path: '/created_routines',
    name: 'createdRoutines',
    component:() => import(/* webpackChunkName: "createdRoutines" */ '@/views/CreatedRoutinesView'),
    props: {
      language: 'es'
    },
    meta:{
      requiresAuth:true,
      displayName:'Rutinas creadas'
    }
  },
  {
    path: '/routine_details/:name',
    name: 'routine_details',
    component:() => import(/* webpackChunkName: "createdRoutines" */ '@/views/routineDetails'),
    props:true,
    meta:{
      requiresAuth:true,
      displayName:'Detalle de rutina'
    },

  },
  {
    path: '/create_routine',
    name: 'createRoutine',
    component:() => import(/* webpackChunkName: "createdRoutines" */ '@/views/CreateRutine'),
    props: {
      language: 'es'
    },
    meta:{
      requiresAuth:true,
      displayName:'Crear una rutina'
    }
  },
  {
    path: '/favorites',
    name: 'favorites',
    component:() => import(/* webpackChunkName: "favorites" */ '@/views/FavoritesView'),
    props: {
      language: 'es'
    },
    meta:{
      requiresAuth:true,
      displayName:'Rutinas favoritas'
    }
  },
  {
    path: '/resend_verification',
    name: 'resendVerification',
    component:() => import(/* webpackChunkName: "forgotUser" */ '@/views/ResendVerificationView'),
    meta:{requiresAuth:false}
  },
  {
    path: '/search/:textSearch',
    name: 'search',
    component:() => import(/* webpackChunkName: "search" */ '@/views/SearchResultsView'),
    props(route) { return {textSearch : route.params.textSearch}},
    meta:{
      requiresAuth:true,
      displayName:'Busqueda'
    }
    //TODO: ver si necesita autenticacion
  },
  {
    path: '/verification',
    name: 'verification',
    component:() => import(/* webpackChunkName: "verification" */ '@/views/VerificationView'),
    props: (route)=>({user:route.query.user,code:route.query.code, email:route.query.email}),
    meta:{requiresAuth:false}
  },
  {
    path: '/created_exercises',
    name: 'createdExercises',
    component:() => import(/* webpackChunkName: "createdExercises" */ '@/views/ExercisesCreated'),
    meta:{
      requiresAuth:true,
      displayName: 'Ejercicios creados'
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
  const users = useUsers()
  if(to.matched.some(route => route.meta.requiresAuth)){
    if(!users.isLoggedIn){
      next({ name: "login", query: { redirect: to.fullPath } });
    }else{
      next();
    }
  }else{
    debugger
    if(to.name==='default'){
      if(users.isLoggedIn){
        next({name:'createdRoutines'})
      }else{
        next({name:'landing'})
      }
    }else{
      next()
    }
  }
})

export default router
