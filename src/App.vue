<template>
    <div id="app">
    <nav>
    <v-app-bar class="app_bar" flat app prominent dense>
      <TopBarMenu class="topBar"></TopBarMenu>
<!--      <v-breadcrumbs divider=">"></v-breadcrumbs>-->
    </v-app-bar>
    <NavigationDrawer/>
    </nav>
    <v-main>
      <router-view/>
    </v-main>

  </div>
</template>

<style lang="scss" >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.topBar{
  width: 100%;
  height: 100%;
}
.app_bar{
  background-color: var(--v-white-base);
  padding: 0;
  margin: 0;
  border: 0;
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
// import NavigationDrawer from "@/components/NavigationDrawer";
import TopBarMenu from "@/components/TopBarMenu";
import NavigationDrawer from "@/components/NavigationDrawer";
export default {
  components: { NavigationDrawer, TopBarMenu}
}
</script>