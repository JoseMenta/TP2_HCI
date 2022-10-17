<!-- Componente para filtar rutinas -->
<template>
  <div>
    <div class="div-filter-style mr-9">
      <slot name="firstFilter"></slot>
      <FilterMenu :id="1"
                  :options="iconsScore"
                  :width="150"
                  :key="version + '1'"
                  :placeholder="this.filters.Puntuacion===-1? 'Puntuación' : iconsScore[5 -filters.Puntuacion]"
                  :left-border-radius="4" :right-border-radius="4"
                  @menuChanged="getPuntuacionFilter"/>
      <FilterMenu :id="2"
                  :options="iconsLevels"
                  :width="150"
                  :key="version + '2'"
                  :placeholder="this.filters.Dificultad==='x'? 'Dificultad' : iconsLevels[levels.indexOf(filters.Dificultad)]"
                  :left-border-radius="4" :right-border-radius="4"
                  @menuChanged="getDificultadFilter"/>
      <!-- TODO: Ver qué va en Categoria -->
      <FilterMenu :id="3"
                  :options="getCategoryNames"
                  :width="150"
                  :key="version + '3'"
                  :placeholder="this.filters.Categoria===-1? 'Categoría' : getCategoryNames[filters.Categoria]"
                  :left-border-radius="4" :right-border-radius="4"
                  @menuChanged="getCategoriaFilter"/>
      <v-sheet class="d-inline-flex align-center">
        <h3>Limpiar Filtros</h3>
        <v-icon class="mr-2" color="black" @click="resetFilters">filter_alt_off</v-icon>
      </v-sheet>
    </div>
    <div class="mt-12 d-flex">
      <h1 class="order-by-text-style d-inline-flex mr-6">Ordenar por:</h1>
      <FilterMenu :id="4"
                  :options="['Fecha de creación', 'Puntuación', 'Dificultad', 'Categoría']"
                  :width="200"
                  :key="version + '4'"
                  :left-border-radius="4" :right-border-radius="0"
                  @menuChanged="getOrderFilter"/>
      <FilterMenu :id="5"
                  :options="['Descendente', 'Ascendente']"
                  :width="150"
                  :key="version + '5'"
                  :left-border-radius="0" :right-border-radius="4"
                  @menuChanged="getOrder"/>
    </div>
  </div>
</template>

<script>
import FilterMenu from "@/components/FilterMenu";

import {useCategories} from "@/store/Categories";
import {mapState} from "pinia";

export default {
  name: "RoutineFilter",
  components: {
    FilterMenu
  },
  data() {
    return {
      filters: this.prevValues,
      levels : ['expert', 'advanced',  'intermediate', 'beginner', 'rookie'],
      iconsLevels: ['⚡⚡⚡⚡⚡', '⚡⚡⚡⚡', '⚡⚡⚡', '⚡⚡', '⚡'],
      iconsScore: ['⭐⭐⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐', '⭐⭐', '⭐'],
      version: 0
    }
  },
  props:{
    prevValues:{
      type: Object,
      require: true
    }
  },
  methods: {
    resetFilters(){
      this.filters = { Puntuacion : -1,  Dificultad : 'x', Categoria : -1, OrderFilter : 'Fecha de creación' , Order: -1 }
      this.version++;
      this.emitSignal();
    },
    getPuntuacionFilter(id) {
      console.log(id);
      this.filters.Puntuacion = 5-id;
      this.emitSignal();
    },
    getDificultadFilter(id){
      console.log(id);
      this.filters.Dificultad = this.levels[id];
      this.emitSignal();
    },
    getCategoriaFilter(id){
      console.log(id);
      this.filters.Categoria = id;
      this.emitSignal();
    },
    getOrderFilter(id, value){
      this.filters.OrderFilter = value;
      this.emitSignal();
    },
    getOrder(id, value){
      if(value === 'Descendente')
        this.filters.Order = -1;
      else
        this.filters.Order = 1;
      this.emitSignal();
    },
    emitSignal(){
      this.$emit('getFilters', this.filters);
    }
  },
  computed: {
    ...mapState(useCategories, {getCategories: 'getCategories'}),
    getCategoryNames() {
      console.log(this.filters)
      console.log(this.getCategories)
      return this.getCategories.map((category) => category.name);
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