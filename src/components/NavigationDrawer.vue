<template>
  <v-navigation-drawer app class="navigation_drawer">
    <v-list-item class="pt-8">
      <v-img src="fiti-logo.png" ></v-img>
    </v-list-item>
    <v-list
        dark
        dense
        rounded
        nav
    >
      <v-list-item
          v-for="item in basic_items"
          :key="item.title"
          :to="item.route"
          link
          active-class="active_item"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider class="divider"></v-divider>
    <v-list
        dense
        rounded
        dark
        nav
    >
      <v-list-item
          v-for="item in other_items"
          :key="item.title"
          :to="item.route"
          link
          active-class="active_item"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

export default {
  name: "NavigationDrawer",
  data () {
    return {
      basic_items: [
        { title: 'Rutinas creadas', icon: 'fitness_center',route:'/about'},
        { title: 'Ejercicios creados', icon: 'directions_run',route:'/' },
        { title: 'Favoritos', icon:'favorite',route:'/favorites' },
      ],
      right: null,
      other_items:[
        {title: 'Configuración',icon:'settings',route:'/login'},
        {title:'Cerrar sesión',icon:'logout',route:'/about'}
      ]
    }
  },
}
</script>

<style scoped>
.navigation_drawer{
  background-color: var(--v-blue-base);
  height: 100%;
}
.divider{
  color: var(--v-white-base);
  background-color: white;
  width: 100%;
}
.active_item{
  color: var(--v-white-base);
  background-color: var(--v-darkBlue-base);
}
.v-list-item--active:before{
  opacity: 0;
}
</style>