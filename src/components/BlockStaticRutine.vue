<template>
  <v-card v-if="dataLoaded" class="block-rutine" flat>
    <h3 class="cycle-type-style mt-3 ml-5 font-italic">{{getTypeName}}</h3>
    <v-card class="d-flex justify-space-between mx-5" color="#E8F1F6" flat>
      <h1 class="">{{cycleData.name}}</h1>
      <NumberSelector class="align-self-start" :read-only="true" :deactivate="false" :component-width="190" :text-size="16" :component-border-radius="4" data-text="Repeticiones" :data-value="cycleData.repetitions"/>
    </v-card>
    <div class="mt-1">
      <v-container fluid>
        <v-row>
          <v-col v-for="ex in cycleData.exercises" :key="ex.id" cols="6">
            <ExerciseCard :id="ex.data.id" :order="ex.data.order"
                          :details="{needed: true, duration: ex.duration, repetitions: ex.repetitions}"
                          :editRemove="false" />
          </v-col>
        </v-row>
      </v-container>
    </div>

  </v-card>
</template>

<script>
import NumberSelector from "@/components/NumberSelector";
import ExerciseCard from "@/components/ExerciseCard";

import {useRoutineCycles} from "@/store/RoutineCycles";
import {CycleTypes} from "@/api/cycles";
const routineCyclesStore = useRoutineCycles();

export default {
  name: "BlockStaticRutine",
  components: {NumberSelector, ExerciseCard},
  props:{
    cycleId:{
      type:Number,
      required:true
    }
  },
  data(){
    return{
      cycleData: {},
      dataLoaded: false
    }
  },
  computed:{
    getTypeName(){
      switch (this.cycleData.type) {
        case CycleTypes.WARMUP:
          return 'Calentamiento'
        case CycleTypes.COOLDOWN:
          return 'Elongación'
        default:
          return 'Ejercitamiento'
      }
    },
  },
  methods: {
  },
  beforeMount() {
    this.cycleData = routineCyclesStore.getCycleById(this.cycleId);
    this.dataLoaded = true;
  },
}
</script>

<style scoped>

:deep(.v-label) {
  font-size: 30px
}

.title_block{
  font-size: 30px;
}

.margin-Task{
  margin-bottom: 30px;
}

.block-rutine{
  background-color: #E8F1F6;
  border: #79747E solid;
  border-radius: 20px !important;
}

.cycle-type-style {
  color: var(--v-darkBlue-base);
}
</style>