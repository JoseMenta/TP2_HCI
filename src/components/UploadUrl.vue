<!-- Componente para el manejo de alertas -->
<template>
  <v-card class="card-style">
    <v-card-title class="text-h5">
      {{this.title}}
    </v-card-title>
    <v-card-text>
      {{this.text}}
    </v-card-text>
    <v-text-field class="pa-5" v-model="url">
    </v-text-field>
    <v-divider/>
    <v-card-actions class="justify-end">
      <v-btn :color="$vuetify.theme.themes.light.blue" @click="closeWarning">
        <span class="white--text">Cancelar</span>
      </v-btn>
      <v-btn :color="$vuetify.theme.themes.light.green" @click="subir">
        <span class="white--text">subir</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "UploadUrl",
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  data(){
    return {
      url: ''
    }
  },
  methods: {
    // El padre al recibir closeWarning debe cerrar este popUp
    closeWarning(){
      this.$emit('closeWarning')
    },
    subir() {
      // El padre debe cerrar este popUp
      this.$emit('subir', this.url)
    }
  }
}
</script>

<style scoped>

.card-style {
  border-radius: 12px;
}

</style>
