<template>
  <v-card class="block-rutine" flat>
    <v-card height="80" class="d-flex justify-space-between ma-5" color="#E8F1F6" flat>
      <h1 class="mb-7 mt-5">{{cycleData.name}}</h1>
      <NumberSelector :deactivate="false" :component-width="190" :text-size="16" :component-border-radius="4" data-text="Repeticiones" :data-value="cycleData.repetitions" class="mt-5"/>
    </v-card>
    <div class="mt-1">
      <v-container>
        <v-row>
          <v-col v-for="ex in cycleData.exercises" :key="ex.id" cols="6">
            <ExerciseCard :id="ex.id"></ExerciseCard>
          </v-col>
        </v-row>
      </v-container>
    </div>

  </v-card>
</template>

<script>
import NumberSelector from "@/components/NumberSelector";
import ExerciseCard from "@/components/ExerciseCard";
import {useCycles} from "@/store/Cycles";

export default {
  name: "BlockStaticRutine",
  components: {NumberSelector, ExerciseCard},
  props:{
    routineId:{
      type:Number,
      required:true
    },
    cycleId:{
      type:Number,
      required:true
    }
  },
  data(){
    return{
      excercise: 2,
    }
  },
  computed:{
    cycleData(){
      const cycles = useCycles()
      return cycles.getCycleById(this.cycleId)
    }
  },
  methods: {
    addExcercise() {
      this.excercise = this.excercise+1;
      this.$emit('newExccercice')
    },
  }
}
</script>

<style scoped>

::v-deep .v-label {
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
</style>