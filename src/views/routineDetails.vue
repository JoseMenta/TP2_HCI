<template>
  <div class="mx-7 mt-7">
    <v-sheet class="d-inline-flex justify-space-around mb-10" flat width="100%">
      <v-sheet class="d-flex flex-column" width="70%" flat>
<!--        <v-text-field-->
<!--            hide-details-->
<!--            placeholder="Nombre de Rutina"-->
<!--            solo-->
<!--            flat-->
<!--            class="title_rutine mb-2 pa-0 ml-0"-->
<!--        ></v-text-field>-->
        <h1>{{routineData.name}}</h1>
        <v-card class="d-inline-flex mb-5" flat tile>
          <h2 class="text-truncate mr-2">Valoracion: </h2>
          <v-rating
              background-color="black"
              color="black"
              :empty-icon="$vuetify.icons.values.starEmpty"
              :full-icon="$vuetify.icons.values.starFull"
              length="5"
              :value="routineData.stars"
              readonly
          ></v-rating>
<!--          Esto no deberia estar aca-->
          <h2> ( {{routineData.stars}} K )</h2>
        </v-card>
<!--        TODO: cambiar esto por lo del store-->
        <v-card class="d-inline-flex mb-5" flat tile>
          <h2 class="text-truncate mr-2">Dificultad: </h2>
          <v-icon v-for="i in 5" :key="i" :color="setColorLevel(i)" medium >bolt</v-icon>
        </v-card>
        <v-card class="d-inline-flex" flat>
          <info-tag v-for="tag in routineData.metadata.tags" :key="tag" :content="tag"></info-tag>
<!--          <v-card v-for="i in routineData.metadata.tags" :key="i" elevation="0"  min-width="70px" height="56" class="mr-4">-->
<!--            <v-text-field placeholder="Tag"-->
<!--                          hide-details-->
<!--                          solo background-color="#DAE1E7"-->
<!--                          height="48px" width="50px"-->
<!--                          filled-->
<!--                          :v-model="i"-->
<!--            ></v-text-field>-->
<!--          </v-card>-->
        </v-card>
      </v-sheet>
      <v-sheet width="30%" class="d-flex flex-column justify-end" flat>
        <v-img
            :src="routineData.image"
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
      <block-static-rutine class="mb-5" v-for="cycle in routineCycles" :key="cycle.id" :routine-id="id" :cycle-id="cycle.id" ></block-static-rutine>
    </v-card>
  </div>
</template>

<script>
import BlockStaticRutine from "@/components/BlockStaticRutine";
import {useRoutines} from "@/store/Routines";
import InfoTag from "@/components/InfoTag";
import {useCycles} from "@/store/Cycles";
export default {
  name: "routineDetails",
  components: {InfoTag, BlockStaticRutine},
  data(){
    return{

      blocks: [{name: 'inicio', rep: 5, ejercicios: 4}, {name: 'mitad', rep: 3, ejercicios: 9}, {name: 'final', rep:6, ejercicios: 1}]
    }
  },
  props:{
    id:{
      type:Number,
      required:true
    }
  },
  computed:{
    routineData(){
      const routines = useRoutines()
      return routines.getRoutineById(this.id)
    },
    routineCycles(){
      const cycles = useCycles()
      return cycles.getCycles
    }
  },
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

