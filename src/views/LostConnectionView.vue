<template>
  <div>
    <TopBarLogo/>
    <v-container>
      <v-img contain class="mr-auto" height="10vh" max-width="10vh" :alt="'Pàgina no encontrada'" :src="require('@/assets/disconnected.png')"/>
      <v-row>
        <v-col cols="12">
          <h1 class="error-text-style">¡ERROR!</h1>
          <h3 class="error-text-style">No está conectado a internet</h3>
        </v-col>
      </v-row>
      <v-divider class="my-5"></v-divider>
      <v-row>
        <v-col cols="12">
          <h5 class="d-inline-flex black--text mr-2">Conéctese a internet y vuela a intentar</h5>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TopBarLogo from "@/components/TopBarLogo";
export default {
  name: "LostConnectionView",
  components: {TopBarLogo},
}
</script>

<style scoped>
.error-text-style {
  color: var(--v-darkBlue-base);
}
</style>