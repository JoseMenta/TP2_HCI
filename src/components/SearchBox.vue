<!-- Componente para el buscador de la navegacion persistente -->
<!-- TODO: Setear los colores theme, estan puestos a mano -->
<template>
  <v-col class="shrink pt-0" v-click-outside="retractBox">
    <v-sheet class="d-inline-flex included"
             :width="searchWidth">
      <v-text-field class="text-field-style"
                    :placeholder="this.placeholder"
                    background-color="#DAE1E7"
                    color="#1C1B1F"
                    solo flat hide-details single-line clearable
                    v-model="inputSearch"
                    @click="expandBox">
        <v-icon slot="prepend-inner"
                class="mx-3"
                color="#1C1B1F"
                :size="iconSize"
                v-text="$vuetify.icons.values.search"
                @click="searchMethod"/>
      </v-text-field>
    </v-sheet>

    <v-expand-transition>
      <v-card :width="searchWidth" :height="400" class="elevation-8 border-radius" v-show="expand" v-if="filters">
        <v-card class="d-inline-flex mb-10 mt-10 included align-center" width="100%" flat>
          <v-sheet width="25%">
            <h3 class="ml-5">Buscar por</h3>
          </v-sheet>
          <BinaryFilter v-bind:filters="['Nombre de Rutina', 'Nombre Creador']" @sentSelect="getSelect" :prevValue=0 :key="version"></BinaryFilter>
        </v-card>
        <v-sheet class="d-inline-flex included" width="100%" flat>
          <v-sheet width="25%">
            <h3 class="ml-5">Filtrar por</h3>
          </v-sheet>
          <v-sheet class="d-inline-flex justify-space-between align-center mr-5" width="75%">
            <FilterMenu :id="1" @menuChanged="getPuntuacion"
                        :options="['⭐⭐⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐', '⭐⭐', '⭐']"
                        :width="150"
                        :key="version"
                        :placeholder="getText(this.ratingText)"
                        :left-border-radius="4" :right-border-radius="4"/>
            <FilterMenu :id="2" @menuChanged="getDificultad"
                        :options="['⚡⚡⚡⚡⚡', '⚡⚡⚡⚡', '⚡⚡⚡', '⚡⚡', '⚡']"
                        :width="150"
                        :key="version"
                        :placeholder="getText(this.levelText)"
                        :left-border-radius="4" :right-border-radius="4"/>
            <!-- TODO: Ver qué va en Categoria -->
            <FilterMenu :id="3"
                        :options="getCategoryNames"
                        :width="150"
                        :key="version"
                        :placeholder="'Categoría'"
                        :left-border-radius="4" :right-border-radius="4"
                        @menuChanged="getCategoriaFilter"/>
          </v-sheet>
        </v-sheet>
        <v-container>
          <v-row>
            <slot name="header"></slot>
            <v-col v-for="(i, index) in RutinesRecomended" :key="index" cols="6" >
              <SearchCardRutine :name="i.name" v-bind:ranking="i.ranking" @click.native="retractBox" :srcImg="require('@/assets/' + i.srcImg + '')"
                                ></SearchCardRutine>
            </v-col>
          </v-row>
        </v-container>
        </v-card>
    </v-expand-transition>
  </v-col>
</template>

<script>
import BinaryFilter from "@/components/BinaryFilter";
import FilterMenu from "@/components/FilterMenu";
import SearchCardRutine from "@/components/SearchCardRutine";
import {mapState} from "pinia";
import {useCategories} from "@/store/Categories";
export default {
  name: "SearchBox",
  components: {SearchCardRutine, FilterMenu, BinaryFilter},
  // --------------------------------------------
  // String language: Indica el lenguaje en que se debe mostrar el contenido estatico (Valores aceptados: 'es' y 'en')
  // Function searchMethod: Funcion que se debe ejecutar al clickear la lupa
  // Number searchBoxWidth: Largo del search box (en px)
  // Number iconSize: Tamaño del icono (en px)
  // Number btnBorderRadius: Radio del borde (en px)
  // Number textSize: Tamaño del texto (en px)
  // --------------------------------------------
  props: {
    language: {
      type: String,
      required: true,
      validator(value) {
        return ['es', 'en'].includes(value)
      }
    },
    searchBoxWidth: {
      type: Number,
      required: true
    },
    iconSize: {
      type: Number,
      required: true
    },
    btnBorderRadius: {
      type: Number,
      required: true
    },
    textSize: {
      type: Number,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    filters:{
      type: Boolean,
      required: true
    }
  },
  data(){
    return {
      inputSearch: '',
      expand: false,
      avoidClose: false,
      // Defino una variable para poder parametrizar el CSS
      textSizeCSS: this.textSize + 'px',
      btnBorderRadiusCSS: this.btnBorderRadius + 'px',
      searchWidth : this.searchBoxWidth,
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
      RutinesRecomended: [
        {name: 'Futbol', ranking: 5, srcImg: 'lionel-messi.webp'},
        {name: 'Estiramientos', ranking: 5, srcImg: 'estiramiento.png'},
        {name: 'Rutina de sofi', ranking: 4, srcImg: 'Burpee.jpg'},
        {name: 'Full body', ranking: 4, srcImg: 'placeholder.jpg'},
      ],
      puntuacion: -1,
      dificultad: 'x',
      categoria: -1,
      binary: 0,
      version: 0
    }
  },
  methods: {
    getCategoriaFilter(id){
      console.log(id);
      this.avoidClose = true
      this.categoria=id;
    },
    getSelect(index){
      this.binary = index
    },
    getPuntuacion(id){
      this.avoidClose = true
      this.puntuacion = 5-id
    },
    getDificultad(id){
      this.avoidClose = true
      const aux = ['expert', 'advanced',  'intermediate', 'beginner', 'rookie']
      this.dificultad = aux[id]
    },
    getCategoria(id){
      this.avoidClose = true
      this.categoria = id
    },
    searchMethod(){
      if(this.inputSearch==='')
        this.inputSearch=' '
      this.$router.push('/search/' + this.inputSearch + '/' + this.binary + '&' + this.puntuacion + '&' + this.dificultad + '&' + this.categoria)
      this.retractBox();
      this.puntuacion= -1;
      this.dificultad= 'x';
      this.categoria= -1;
      this.binary= 0;
    },
    expandBox(){
      this.version++;
      this.searchWidth = this.searchBoxWidth + 300;
      this.expand = true;
    },
    getText(componentText){
      return componentText[componentText.map(e => e.lang).indexOf(this.language)].text
    },
    getArrayTexts(componentArrayText){
      return componentArrayText[componentArrayText.map(e => e.lang).indexOf(this.language)].elements
    },
    retractBox(){
      if(!this.avoidClose){
        this.searchWidth = this.searchBoxWidth;
        this.expand = false;
        this.inputSearch=''
      } else {
        this.avoidClose = false
      }
    },
    include () {
      return [document.querySelector('.included')]
    }
  },
  computed: {
    ...mapState(useCategories, {getCategories: 'getCategories'}),
    getCategoryNames() {
      return this.getCategories.map((category) => category.name);
    },
    getPlaceholderText() {
      return this.placeholder[this.placeholder.map(e => e.lang).indexOf(this.language)].text;
    }
  },
}
</script>

<style scoped>

/* Con v-bind puedo utilizar una variable para parametrizar el valor de un estilo */
.text-field-style {
  border-radius: v-bind(btnBorderRadiusCSS);
}

.v-text-field :deep(input) {
  font-size: v-bind(textSizeCSS);
  color: #7A7A7A;
  /* max-height:none permite sacar la restriccion que tiene por default los inputs */
  max-height: none;
}

.v-text-field:deep(input::placeholder) {
  color: #7A7A7A;
}

.card-search{
  background-color: white;
}

.border-radius{
  border-radius: 12px;
}

</style>