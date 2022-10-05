<!-- Componente para filtar rutinas -->
<template>
  <div>
    <div class="div-filter-style mr-9">
      <slot name="firstFilter"></slot>
      <FilterMenu :id="1"
                  :options="['⭐⭐⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐', '⭐⭐', '⭐']"
                  :width="150"
                  :placeholder="getText(this.ratingText)"
                  :left-border-radius="4" :right-border-radius="4"/>
      <FilterMenu :id="2"
                  :options="['⚡⚡⚡⚡⚡', '⚡⚡⚡⚡', '⚡⚡⚡', '⚡⚡', '⚡']"
                  :width="150"
                  :placeholder="getText(this.levelText)"
                  :left-border-radius="4" :right-border-radius="4"/>
      <!-- TODO: Ver qué va en Categoria -->
      <FilterMenu :id="3"
                  :options="getArrayTexts(this.categoryOptionsText)"
                  :width="150"
                  :placeholder="getText(this.categoryText)"
                  :left-border-radius="4" :right-border-radius="4"/>
    </div>
    <div class="mt-12 d-flex">
      <h1 class="order-by-text-style d-inline-flex mr-6">{{getText(this.orderByText)}}</h1>
      <FilterMenu :id="4"
                  :options="getArrayTexts(this.orderByOptionsText)"
                  :width="200"
                  :left-border-radius="4" :right-border-radius="0"/>
      <FilterMenu :id="5"
                  :options="getArrayTexts(this.descAscText)"
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
      ratingText: [
        {text: 'Puntuación', lang: 'es'}, {text: 'Rating', lang: 'en'}
      ],
      levelText: [
        {text: 'Dificultad', lang: 'es'}, {text: 'Level', lang: 'en'}
      ],
      categoryText: [
        {text: 'Categoría', lang: 'es'}, {text: 'Category', lang: 'en'}
      ],
      categoryOptionsText: [
        {elements: ['Zona alta', 'Zona media', 'Zona baja'], lang: 'es'},
        {elements: ['High zone', 'Mid zone', 'Low zone'], lang: 'en'}
      ],
      orderByText: [
        {text: 'Ordenar por:', lang: 'es'}, {text: 'Order by:', lang: 'en'}
      ],
      orderByOptionsText: [
        {elements: ['Fecha de creación', 'Puntuación', 'Dificultad', 'Categoría'], lang: 'es'},
        {elements: ['Date of creation', 'Rating', 'Level', 'Category'], lang: 'en'}
      ],
      descAscText: [
        {elements: ['Descendente', 'Ascendente'], lang: 'es'},
        {elements: ['Descendant', 'Ascendant'], lang: 'en'}
      ],
      newRoutineText: [
        {text: 'Nueva rutina', lang: 'es'}, {text: 'New routine', lang: 'en'}
      ]
    }
  },
  methods: {
    getText(componentText){
      return componentText[componentText.map(e => e.lang).indexOf(this.language)].text
    },
    getArrayTexts(componentArrayText){
      return componentArrayText[componentArrayText.map(e => e.lang).indexOf(this.language)].elements
    }
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