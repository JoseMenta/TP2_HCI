<template>

  <v-app>

    <!-- <NavigationDrawer/>  ya tiene en su interior la estructura necesaria
    <v-navigation-drawer app>
    </v-navigation-drawer>
    -->
    <NavigationDrawer v-if="online && needNavigation()"/>

    <v-app-bar v-if="online && needNavigation()" app color="white" prominent dense>
      <TopBarMenu/>
    </v-app-bar>
    <!-- Sizes your content based upon application components -->
    <v-main v-if="online">
<!--      <div v-if="needNavigation()">-->
<!--        <TopBreadcrums :items="this.getRoutes"-->
<!--                       class="ml-7 py-3"/>-->
<!--      </div>-->
      <hr v-if="needNavigation()">
<!--      <CreatedRoutinesView language="en"/>-->
      <!-- Provides the application the proper gutter -->
        <!-- If using vue-router -->
        <router-view :key="$route.path"></router-view>
    </v-main>
    <div v-else class="main-div">
      <LostConnectionView></LostConnectionView>
    </div>
  </v-app>

</template>

<script>
import NavigationDrawer from "@/components/NavigationDrawer";
import TopBarMenu from "@/components/TopBarMenu";
import {useUsers} from "@/store/User";
import LostConnectionView from "@/views/LostConnectionView";
// import TopBreadcrums from "@/components/TopBreadcrums";
export default {
  name: 'App',

  components: {
    LostConnectionView,
    NavigationDrawer,
    TopBarMenu,
    // TopBreadcrums
  },
  data: () => ({
    online:window.navigator.onLine,
    routes:[],
    loginViews:['landing','pageNotFound', 'register1', 'register2', 'register','login', 'resendVerification', 'verification'],
    // dataLoaded: false
  }),
  methods:{
    changeFavorite(id,status){
      console.log(id)
      console.log(status)
    },
    changeMenu(menuId,newValue){
      console.log(menuId)
      console.log(newValue)
    },
    search(){
      alert("Searching...")
    },
    profile(){
      alert("Open Profile");
    },
    needNavigation(){
      return !(this.loginViews.includes(this.$route.name))
    },
  },
  computed:{
    getRoutes(){
      return this.routes.map((route)=>{
        return{
          text:route.meta.displayName,
          disabled:false,
          to:route.path
        }
      })
    },
  },
  created() {
    window.addEventListener('online',()=>this.online = true)
    window.addEventListener('offline',()=>this.online = false)
    const users = useUsers();
    users.initialize();
  },
  watch:{
    //TODO: ver si dejamos a los breadcrumbs
    // $route(to,from){
    //   if(this.routes.find(route=>route.name===to.name)){
    //     //si esta volviendo a una ruta
    //     const index = this.routes.indexOf(to)
    //     this.routes = this.routes.slice(0,index+1)
    //     return;
    //   }
    //   if(this.loginViews.includes(to.name)){
    //     this.routes=[]
    //     return
    //   }
    //   if(!this.loginViews.includes(from.name)) {
    //     this.routes.push(from)
    //   }
    // }
  }
};
</script>

<style>
.main-div{
  height: 100%;
}

</style>
