<template>
  <div>
    <TopBarLogo/>
    <v-container>
      <v-img contain class="mr-auto" height="10vh" max-width="10vh" :alt="'Pàgina no encontrada'" :src="require('@/assets/pageNotFound.png')"/>
      <v-row>
        <v-col cols="12">
          <h1 class="error-text-style">¡ERROR!</h1>
          <h3 class="error-text-style">La página que está buscando no existe.</h3>
        </v-col>
      </v-row>
      <v-divider class="my-5"></v-divider>
      <v-row>
        <v-col cols="12">
          <h5 class="d-inline-flex black--text mr-2">Rediríjase a la siguiente página:</h5>
          <a @click="changeView({name: 'landing'})">Página inicial</a>
        </v-col>
      </v-row>
    </v-container>
  </div>

</template>

<script>
import TopBarLogo from "@/components/TopBarLogo";
export default {
  name: "PageNotFoundView",
  components: {TopBarLogo},
  methods: {
    changeView(nameView) {
      this.$router.push(nameView);
    }
  }
}
</script>

<style scoped>

.error-text-style {
  color: var(--v-darkBlue-base);
}

</style>