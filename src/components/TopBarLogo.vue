<template>
  <v-card height="100" flat :color="$vuetify.theme.themes.light.blue" class="d-flex justify-center mb-5 top-card">
    <v-btn height="auto" width="200" plain :color="$vuetify.theme.themes.light.blue">
      <v-img src="@/assets/fiti-logo.png"
             contain width="200"
             class="image-style" alt="FITI Logo"
             @click="changeView({name: 'landing'})"/>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  name: "TopBarLogo",
  methods: {
    changeView(nameView) {
      this.$router.push(nameView);
    }
  }
}
</script>

<style scoped>

.top-card{
  border-radius: 0;
}

.image-style{
  margin-bottom: auto;
  margin-top: auto;
  height: 70px;
}

</style>