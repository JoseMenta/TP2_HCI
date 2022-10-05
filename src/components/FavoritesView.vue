<!-- Vista de los favoritos -->
<template>
  <div class="ml-7">
    <h1 class="title-style my-5">{{getText(this.titleText)}}</h1>
    <RoutineFilter :language="language"/>

    <div class="mt-12">
      <RoutineCardList/>
    </div>
  </div>
</template>

<script>
import RoutineFilter from "@/components/RoutineFilter";
import RoutineCardList from "@/components/RoutineCardList";

export default {
  name: "FavoritesView",
  components: {
    RoutineFilter,
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
      titleText: [
        {text: 'Favoritos', lang: 'es'}, {text: 'Favorites', lang: 'en'}
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

</style>