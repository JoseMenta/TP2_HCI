<template>
  <!--      Preguntar como cambiar color de links porque no pude de ningunna manera-->
  <div>
    <v-breadcrumbs
        :items="items"
        divider=">" class="breadcrumb-style"
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

.breadcrumb-style {
  padding: 0;
}

.breadcrumb-style:deep(a) {
  font-size: 20px;
  color: #808080;
}

</style>