<template>
  <v-navigation-drawer app height="100%" color="blue">
    <v-list-item class="pt-8">
      <v-img src="fiti-logo.png" ></v-img>
    </v-list-item>
    <v-list
        dense
        nav
    >
      <v-list-item
          v-for="item in basic_items"
          :key="item.title"
          link
          class="white--text"
      >
        <v-list-item-icon>
          <v-icon color="white">{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list
        dense
        nav
    >
      <v-list-item
          v-for="item in other_items"
          :key="item.title"
          link
          class="white--text"
      >
        <v-list-item-icon>
          <v-icon color="white">{{ item.icon }}</v-icon>
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
        { title: 'Rutinas creadas', icon: 'fitness_center' },
        { title: 'Ejercicios creados', icon: 'directions_run' },
        { title: 'Favoritos', icon:'favorite' },
      ],
      right: null,
      other_items:[
        {title: 'Configuración',icon:'settings'},
        {title:'Cerrar sesión',icon:'logout'}
      ]
    }
  },
}
</script>

<style scoped>

</style>