<template>
  <div class="mx-7 mt-7">
    <v-sheet class="d-inline-flex justify-space-around mb-10" flat width="100%">
      <v-sheet class="d-flex flex-column" width="70%" flat>
        <v-text-field
            hide-details
            placeholder="Nombre de Rutina"
            solo
            flat
            class="title_rutine mb-2 pa-0 ml-0"
        ></v-text-field>
        <v-card class="d-inline-flex mb-5" flat tile>
          <h2 class="text-truncate mr-2">Valoracion: </h2>
          <v-rating
              background-color="black"
              color="black"
              :empty-icon="$vuetify.icons.values.starEmpty"
              :full-icon="$vuetify.icons.values.starFull"
              length="5"
              :value="rating"
              readonly
          ></v-rating>
          <h2> ( {{rating}} K )</h2>
        </v-card>
        <v-card class="d-inline-flex mb-5" flat tile>
          <h2 class="text-truncate mr-2">Dificultad: </h2>
          <v-icon v-for="i in 5" :key="i" :color="setColorLevel(i)" medium >bolt</v-icon>
        </v-card>
        <v-card class="d-inline-flex" flat>
          <v-card v-for="i in tags" :key="i" elevation="0" :width="size(i)" min-width="70px" height="56" class="mr-4">
            <v-text-field placeholder="Tag"
                          hide-details
                          solo background-color="#DAE1E7"
                          height="48px" width="50px"
                          filled
                          v-model="tagsText[i]"
            ></v-text-field>
          </v-card>
        </v-card>
      </v-sheet>
      <v-sheet width="30%" class="d-flex flex-column justify-end" flat>
        <v-img
            :src="require('@/assets/lionel-messi.webp')"
            max-height="200"
            width="auto"
            class="img_rutine elevation-5"
        ></v-img>
        <v-card class="d-inline-flex justify-center justify-space-between" flat>
          <v-btn class="text-capitalize btn-style justify-start"
                 color="#00909E"
                 ripple
                 width="100%"
                 height="auto"
                 @click="changeView({name: 'createdRoutines'})">
            <v-icon medium color="white">play_arrow</v-icon>
            <span class="white--text my-3 mx-3 text-style">Empezar</span>
          </v-btn>
        </v-card>
      </v-sheet>
    </v-sheet>
    <v-card flat  >
      <block-static-rutine class="mb-5" v-for="i in blocks" :key="i" :titleBlock="i.name"  :cantidad="i.ejercicios"></block-static-rutine>
    </v-card>
  </div>
</template>

<script>
import BlockStaticRutine from "@/components/BlockStaticRutine";

export default {
  name: "routineDetails",
  data(){
    return{
      level :2,
      rating: 3,
      tags: 3,
      tagsText: ['', 'Biceps', 'Futbol', 'Piernas'],
      blocks: [{name: 'inicio', rep: 5, ejercicios: 4}, {name: 'mitad', rep: 3, ejercicios: 9}, {name: 'final', rep:6, ejercicios: 1}]
    }
  },
  components: { BlockStaticRutine},
  methods: {
    setColorLevel(i){
      return i>this.level ? "grey" : "black";
    },
    size(i){
      return this.tagsText[i].length * 8
    },
    changeView(nameView) {
      this.$router.push(nameView)
    }
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

.tag-input{
  margin-right: 10px;
;

}

/* Con v-bind puedo utilizar una variable para parametrizar el valor de un estilo */
.text-style {
  font-size: v-bind(textSizeCSS);
}
</style>

