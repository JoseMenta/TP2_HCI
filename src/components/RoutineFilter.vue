<!-- Componente para filtar rutinas -->
<template>
  <div>
    <div class="div-filter-style mr-9">
      <slot name="firstFilter"></slot>
      <FilterMenu :id="1"
                  :options="['⭐⭐⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐', '⭐⭐', '⭐']"
                  :width="150"
                  :placeholder="'Puntuación'"
                  :left-border-radius="4" :right-border-radius="4"
                  @menuChanged="getPuntuacionFilter"/>
      <FilterMenu :id="2"
                  :options="['⚡⚡⚡⚡⚡', '⚡⚡⚡⚡', '⚡⚡⚡', '⚡⚡', '⚡']"
                  :width="150"
                  :placeholder="'Dificultad'"
                  :left-border-radius="4" :right-border-radius="4"
                  @menuChanged="getDificultadFilter"/>
      <!-- TODO: Ver qué va en Categoria -->
      <FilterMenu :id="3"
                  :options="['Cuerpo completo', 'Tren superior', 'Tren inferior', 'Tren medio']"
                  :width="150"
                  :placeholder="'Categoría'"
                  :left-border-radius="4" :right-border-radius="4"
                  @menuChanged="getCategoriaFilter"/>
    </div>
    <div class="mt-12 d-flex">
      <h1 class="order-by-text-style d-inline-flex mr-6">Ordenar por:</h1>
      <FilterMenu :id="4"
                  :options="['Fecha de creación', 'Puntuación', 'Dificultad', 'Categoría']"
                  :width="200"
                  :left-border-radius="4" :right-border-radius="0"
                  @menuChanged="getOrderFilter"/>
      <FilterMenu :id="5"
                  :options="['Descendente', 'Ascendente']"
                  :width="150"
                  :left-border-radius="0" :right-border-radius="4"
                  @menuChanged="getOrder"/>
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
  data() {
    return {
      filters: { Puntuacion : '',  Dificultad : '', Categoria : '', OrderFilter : 'Puntuación', Order: 1 }
    }
  },
  methods: {
    getPuntuacionFilter(id) {
      console.log(id);
      this.filters.Puntuacion = 5-id;
      this.emitSignal();
    },
    getDificultadFilter(id){
      console.log(id);
      const aux = ['expert', 'advanced',  'intermediate', 'beginner', 'rookie']
      this.filters.Dificultad = aux[id];
      this.emitSignal();
    },
    getCategoriaFilter(id){
      console.log(id);
      const aux = [{ id: 0, name: 'Cuerpo completo', detail: 'Cuerpo completo' },
        { id: 0, name: 'Tren superior', detail: 'Tren superior' },
        { id: 0, name: 'Tren inferior', detail: 'Tren inferior' },
        { id: 0, name: 'Tren medio', detail: 'Tren medio' }]
      this.filters.Categoria = aux[id];
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