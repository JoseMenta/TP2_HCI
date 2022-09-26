<template>
  <!--      Preguntar como cambiar color de links porque no pude de ningunna manera-->
  <div>
    <v-breadcrumbs
        :items="items"
        divider=">"
        large
    ></v-breadcrumbs>
  </div>
</template>

<script>
  export default {
  name: "TopBreadcrums",
    props:{
      items:{
        type: Array,
        required: false
      },
    },
  }
</script>


<style scoped>
.BreadcrumbsText{

}
</style>