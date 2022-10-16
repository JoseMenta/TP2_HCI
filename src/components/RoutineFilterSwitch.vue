<!-- Componente para indicar por qué se busca: Rutina o creador -->
<template>
  <BinaryFilter :filters="getArrayTexts(searchNameFilterMenu)" @sentSelect="sentSelect" :prevValue="this.prevValue"/>
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
    prevValue: {
      type: String,
      required: true,
    }
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
    },
    sentSelect(value){
      this.$emit('sentSelect', value);
    }
  }
}
</script>

<style scoped>

</style>