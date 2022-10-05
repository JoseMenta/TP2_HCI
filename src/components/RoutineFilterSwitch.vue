<!-- Componente para indicar por qué se busca: Rutina o creador -->
<template>
  <BinaryFilter :filters="getArrayTexts(searchNameFilterMenu)"/>
</template>

<script>
import BinaryFilter from "@/components/BinaryFilter";

export default {
  name: "RoutineFilterSwitch",
  components: {
    BinaryFilter
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
      searchNameFilterMenu: [
        {elements: ['Nombre de rutina', 'Nombre del creador'], lang: 'es'},
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

</style>