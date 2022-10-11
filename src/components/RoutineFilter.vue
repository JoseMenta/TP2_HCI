<!-- Componente para filtar rutinas -->
<template>
  <div>
    <div class="div-filter-style mr-9">
      <slot name="firstFilter"></slot>
      <FilterMenu :id="1"
                  :options="['⭐⭐⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐', '⭐⭐', '⭐']"
                  :width="150"
                  :placeholder="'Puntuación'"
                  :left-border-radius="4" :right-border-radius="4"/>
      <FilterMenu :id="2"
                  :options="['⚡⚡⚡⚡⚡', '⚡⚡⚡⚡', '⚡⚡⚡', '⚡⚡', '⚡']"
                  :width="150"
                  :placeholder="'Dificultad'"
                  :left-border-radius="4" :right-border-radius="4"/>
      <!-- TODO: Ver qué va en Categoria -->
      <FilterMenu :id="3"
                  :options="['Cuerpo completo', 'Tren superior', 'Tren inferior', 'Tren medio']"
                  :width="150"
                  :placeholder="'Categoría'"
                  :left-border-radius="4" :right-border-radius="4"/>
    </div>
    <div class="mt-12 d-flex">
      <h1 class="order-by-text-style d-inline-flex mr-6">Ordenar por:</h1>
      <FilterMenu :id="4"
                  :options="['Fecha de creación', 'Puntuación', 'Dificultad', 'Categoría']"
                  :width="200"
                  :left-border-radius="4" :right-border-radius="0"/>
      <FilterMenu :id="5"
                  :options="['Descendente', 'Ascendente']"
                  :width="150"
                  :left-border-radius="0" :right-border-radius="4"/>
    </div>
  </div>
</template>

<script>
import FilterMenu from "@/components/FilterMenu";

export default {
  name: "RoutineFilter",
  components: {
    FilterMenu
  },
  // props: {
  //   language: {
  //     type: String,
  //     required: true,
  //     validator(value) {
  //       return ['es', 'en'].includes(value)
  //     }
  //   },
  // },
  data() {
    return {
      // ratingText: [
      //   {text: 'Puntuación', lang: 'es'}, {text: 'Rating', lang: 'en'}
      // ],
      // levelText: [
      //   {text: 'Dificultad', lang: 'es'}, {text: 'Level', lang: 'en'}
      // ],
      // categoryText: [
      //   {text: 'Categoría', lang: 'es'}, {text: 'Category', lang: 'en'}
      // ],
      // categoryOptionsText: [
      //   {elements: ['Cuerpo completo', 'Tren superior', 'Tren inferior', 'Tren medio'], lang: 'es'},
      //   {elements: ['Full body', 'Upper body', 'Lower body', 'Mid body'], lang: 'en'}
      // ],
      // orderByText: [
      //   {text: 'Ordenar por:', lang: 'es'}, {text: 'Order by:', lang: 'en'}
      // ],
      // orderByOptionsText: [
      //   {elements: ['Fecha de creación', 'Puntuación', 'Dificultad', 'Categoría'], lang: 'es'},
      //   {elements: ['Date of creation', 'Rating', 'Level', 'Category'], lang: 'en'}
      // ],
      // descAscText: [
      //   {elements: ['Descendente', 'Ascendente'], lang: 'es'},
      //   {elements: ['Descendant', 'Ascendant'], lang: 'en'}
      // ],
    }
  },
  methods: {
    // getText(componentText){
    //   return componentText[componentText.map(e => e.lang).indexOf(this.language)].text
    // },
    // getArrayTexts(componentArrayText){
    //   return componentArrayText[componentArrayText.map(e => e.lang).indexOf(this.language)].elements
    // }
  }
}
</script>

<style scoped>

.div-filter-style {
  display: flex;
  justify-content: space-between;
}

.order-by-text-style {
  font-size: 24px;
}

</style>