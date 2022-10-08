<!-- Componente para la visualizacion de las imagenes y videos -->
<template>
  <v-card>
    <v-app-bar class="justify-start close-style">
      <v-icon v-text="$vuetify.icons.values.clear"
              color="#1C1B1F"
              :size="50" @click="close"/>
    </v-app-bar>
    <v-divider/>
    <v-img :src="require('@/assets/placeholder.jpg')" class="d-flex justify-center align-center">
      <v-icon v-text="$vuetify.icons.values.playCircle"
              color="#1C1B1F"
              :size="83"
              class="play-button-style"
              @click="play"/>
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: "MediaPopUp",
  methods: {
    close() {
      // El padre debe cerrar el popUp
      this.$emit('closeWarning')
    },
    play() {
      alert('play')
    }
  }
}
</script>

<style scoped>

.close-style {
  position: sticky;
  top: 0;
  z-index: 1;
}

.play-button-style {
  display: flex;
  margin: auto;
}

</style>