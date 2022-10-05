<!-- Vista de la pagina principal -->
<template>
  <div class="ml-7">
    <h1 class="title-style my-5">{{getText(this.mainPageText)}}</h1>
    <RoutineFilter :language="language">
      <template v-slot:firstFilter>
        <RoutineFilterSearch :language="language"/>
      </template>
    </RoutineFilter>

    <div class="mt-12">
      <RoutineCardList>
        <template v-slot:header>
          <v-col class="d-flex" cols="6">
            <v-card class="d-flex flex-column align-center justify-center rounded new-routine-card-style" color="#E8F1F6" hover @click="alert()">
              <v-icon v-text="$vuetify.icons.values.add" color="#1C1B1F" :size="70"/>
              <span class="new-routine-text-style">Nueva rutina</span>
            </v-card>
          </v-col>
        </template>
      </RoutineCardList>
    </div>
  </div>
</template>

<script>
import RoutineCardList from "@/components/RoutineCardList";
import RoutineFilter from "@/components/RoutineFilter";
import RoutineFilterSearch from "@/components/RoutineFilterSearch";

export default {
  name: "CreatedRoutinesView",
  components: {
    RoutineFilter,
    RoutineFilterSearch,
    RoutineCardList
  },
  props: {
    language: {
      type: String,
      required: true,
      validator(value) {
        return ['es', 'en'].includes(value)
      }
    },
  },
  data(){
    return {
      mainPageText: [
        {text: 'Rutinas creadas', lang: 'es'}, {text: 'Created routines', lang: 'en'}
      ],
    }
  },
  methods: {
    getText(componentText){
      return componentText[componentText.map(e => e.lang).indexOf(this.language)].text
    }
  }
}
</script>

<style scoped>

.title-style {
  font-size: 48px;
}

.new-routine-card-style {
  width: 100%;
}

.new-routine-text-style {
  font-size: 48px;
  color: #1C1B1F;
}

</style>