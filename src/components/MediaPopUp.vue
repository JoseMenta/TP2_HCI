<!-- Componente para la visualizacion de las imagenes y videos -->
<template>
  <v-card class="card-style">
    <v-app-bar class="justify-start close-style">
      <v-icon v-text="$vuetify.icons.values.clear"
              color="#1C1B1F"
              :size="35" @click="close"/>
    </v-app-bar>
    <v-divider/>
    <v-img :src="imgSrc" class="d-flex justify-center align-center">
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
  // ----------------------------------------------------------
  // imgSrc: Imagen a mostrar
  // ----------------------------------------------------------
  props: {
    imgSrc: {
      type: String,
      required: true
    }
  },
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

.card-style {
  border-radius: 24px;
}

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