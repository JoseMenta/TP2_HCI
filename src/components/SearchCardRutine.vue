<template>
  <v-sheet class="d-inline-flex" height="50">
    <v-sheet width="120" class="mr-5" elevation="0">
      <v-img
          :src="routineData.metaData.image"
          max-height="80"
          class="img_rutine elevation-1"
          @click="changeView({name: 'routineDetails'})"
      ></v-img>
    </v-sheet>
    <v-sheet>
      <h3 class="text-truncate">{{routineData.name}}</h3>
      <v-rating
          background-color="black"
          color="black"
          :empty-icon="$vuetify.icons.values.starEmpty"
          :full-icon="$vuetify.icons.values.starFull"
          length="5"
          :value="routineData.ranking"
          readonly
          size="20"
      ></v-rating>
    </v-sheet>

  </v-sheet>
</template>

<script>
export default {
  name: "SearchCardRutine",
  props:{
    routineData: {
      type: Object,
      required: true
    }
  },
  methods: {
    changeView(nameView) {
      this.$router.push(nameView)
    }
  }
}
</script>

<style scoped>

.img_rutine{
  border-radius: 3px;
}

</style>