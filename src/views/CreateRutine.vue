<template>
  <div class="mx-7 mt-7">
    <v-card class="d-inline-flex justify-center align-start justify-space-around mb-10" flat>
      <v-sheet class="" width="60%" flat>
        <v-text-field
            hide-details
            label="Nombre de Rutina"
            placeholder="Nombre de Rutina"
            solo
            flat
            class="title_rutine mb-7 pa-0 ml-0"
            max-height="40"
        ></v-text-field>
        <h2 class=" mb-7">Dificultad:</h2>
        <info-tag content="+ Tags"></info-tag>
      </v-sheet>
      <v-card width="40%" class="d-flex flex-column" flat>
        <v-img
            :src="require('@/assets/placeholder.jpg')"
            max-height="200"
            width="auto"
            class="img_rutine elevation-5"
        ></v-img>
        <v-card class="d-inline-flex justify-center justify-space-between" flat>
          <v-btn class="text-capitalize btn-style"
                 color="#00909E"
                 ripple
                 width="45%"
                 height="auto">
            <v-icon small color="white">done</v-icon>
            <span class="white--text my-3 mx-3 text-style">Guardar</span>
          </v-btn>
          <v-btn class="text-capitalize btn-style"
                 color="#27496D"
                 ripple
                 width="45%"
                 height="auto">
            <v-icon small color="white">delete</v-icon>
            <span class="white--text  my-3 mx-3 text-style">Descartar</span>
          </v-btn>
        </v-card>
    </v-card>
    </v-card>
    <v-card flat  >
      <block-rutine class="mb-5"></block-rutine>
      <block-rutine class="mb-5" v-for="i in blocks" :key="i"></block-rutine>
      <NewBlock class="mb-5" :action="addBlock"></NewBlock>
      <block-rutine></block-rutine>
    </v-card>
  </div>
</template>

<script>
import InfoTag from "@/components/InfoTag";
import BlockRutine from "@/components/blockRutine";
import NewBlock from "@/components/NewBlock";

export default {
  name: "CreateRutine",
  data(){
    return{
      blocks: 2,
    }
  },
  components: {NewBlock, BlockRutine, InfoTag},
  methods: {
    addBlock() {
      this.blocks = this.blocks +1;
      this.$emit('newExccercice')
    },
  }
}
</script>

<style scoped>

.custom-text-field.v-text-field.v-text-field--enclosed .v-input__slot {
  padding: 0;
}

:deep(.v-label) {
  font-size: 30px
}

.title_rutine{
  font-size: 30px;
}

.img_rutine{
  margin-bottom: 15px;
  border-radius: 20px !important;
}
/* se como cambiarlo al importarnt */

.btn-style {
  border-radius: 12px;
}


/* Con v-bind puedo utilizar una variable para parametrizar el valor de un estilo */
.text-style {
  font-size: v-bind(textSizeCSS);
}
</style>