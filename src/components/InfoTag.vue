<template>
  <v-btn class="tag rounded-lg" color="grey">
    <span class="px-1 py-2">
      {{content}}
    </span>
  </v-btn>
</template>

<script>
export default {
  name: "InfoTag",
  props:{
    content:{
      type:String,
      required:true
    }
  }
}
</script>

<style scoped>

.tag{
  margin-right: 10px;
}

</style>