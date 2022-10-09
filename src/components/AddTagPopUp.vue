<!-- PopUp para crear tags -->
<template>
  <v-card class="card-style">
    <v-card-title class="text-h5">Añadir tag</v-card-title>
    <v-card-text class="text-h6">Escriba el nuevo tag que desea añadir.</v-card-text>
    <div class="d-flex align-center ml-6 mr-5 mt-n5">
      <span class="d-inline-flex text-h6">Tag: </span>
      <v-text-field class="d-inline-flex text-field-style ml-1"
                    @input="updateTagIsEmpty"
                    :rules="[rules.required]"
                    :error="tagIsEmpty"
                    placeholder="Ingrese el nombre del tag"
                    v-model="tagText"></v-text-field>
    </div>
    <v-divider/>
    <v-card-actions class="justify-end">
      <v-btn :color="$vuetify.theme.themes.light.blue" @click="closeWindow">
        <span class="white--text">Cancelar</span>
      </v-btn>
      <v-btn :color="$vuetify.theme.themes.light.green" @click="addTag">
        <span class="white--text">Aceptar</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AddTagPopUp",
  data() {
    return {
      tagText: '',
      tagIsEmpty: false,
      rules: {
        required: value => !!value || 'Se requiere un nombre del tag'
      }
    }
  },
  methods: {
    // El padre debe cerrar este popUp
    closeWindow(){
      this.$emit('closeWindow')
    },
    addTag() {
      if(this.tagText === ''){
        this.updateTagIsEmpty()
      } else {
        // El padre debe cerrar este popUp
        this.$emit('addTag', this.tagText)
      }
    },
    updateTagIsEmpty(){
      this.tagIsEmpty = (this.tagText === '')
    }
  }
}
</script>

<style scoped>

.card-style {
  border-radius: 12px;
}

.text-field-style{
  width: 100%;
}

.text-field-style:deep(input) {
  padding-bottom: 0;
}

</style>