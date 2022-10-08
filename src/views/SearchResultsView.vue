<!-- Vista para mostrar los resultados de una busqueda -->
<template>
  <div class="ml-7 mt-10">
    <RoutineFilter :language="language">
      <template v-slot:firstFilter>
        <RoutineFilterSwitch :language="language"/>
        <v-divider vertical class="divider-style"/>
      </template>
    </RoutineFilter>

    <div class="mt-12">
      <RoutineCardList/>
    </div>
  </div>
</template>

<script>
import RoutineCardList from "@/components/RoutineCardList";
import RoutineFilter from "@/components/RoutineFilter";
import RoutineFilterSwitch from "@/components/RoutineFilterSwitch";

export default {
  name: "SearchResultsView",
  components: {
    RoutineFilter,
    RoutineCardList,
    RoutineFilterSwitch
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
}
</script>

<style scoped>

.divider-style {
  border: 1px solid #142850;
}

</style>