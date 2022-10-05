<!-- Componente para buscar por nombre de rutina o por nombre de creador -->
<template>
  <div class="d-inline-flex">
    <FilterMenu :id="0"
                :options="getArrayTexts(this.searchNameFilterMenu)"
                :width="175"
                :left-border-radius="4" :right-border-radius="0"/>
    <input class="text-field-style pl-1" type="text" v-model="filterSearchText"/>
  </div>
</template>

<script>
import FilterMenu from "@/components/FilterMenu";

export default {
  name: "RoutineFilterSearch",
  components: {
    FilterMenu
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
  data() {
    return {
      filterSearchText: '',
      searchNameFilterMenu: [
        {elements: ['Nombre de la rutina', 'Nombre del creador'], lang: 'es'},
        {elements: ['Routine name', 'Creator name'], lang: 'en'}
      ],
    }
  },
  methods: {
    getArrayTexts(componentArrayText){
      return componentArrayText[componentArrayText.map(e => e.lang).indexOf(this.language)].elements
    }
  }
}
</script>

<style scoped>

.text-field-style {
  border-radius: 0 4px 4px 0;
  border: 2px solid #142850;
  font-size: 12px;
  height: 100%;
  width: 100%;
}

</style>