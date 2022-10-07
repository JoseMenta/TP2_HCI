<template>
    <div>
      <v-sheet height="70" color="#27496D" class="d-flex justify-center align-center justify-space-between mb-3">
          <v-img
              src="@/assets/fiti-logo.png"
              contain
              height="50"
          />
        <div class="d-inline-flex">
          <v-btn
              class="mx-4"
              color="white"
              plain
          >
            Registrarte
          </v-btn>
          <v-btn
              class="mx-4"
              color="white"
              plain
              @click="remove"
          >
            Iniciar Sesión
          </v-btn>
      </div>
      </v-sheet>
      <div class="fixed_text">
        <h1>FITI</h1>
        <h2>Una nueva experiencia de Entrenamiento</h2>
      </div>
      <div class="d-flex fixed_landing align-end">
        <v-img
            src="@/assets/landing.png"
            contain
        />
      </div>
      <v-img src="@/assets/disponible_en.png"
             contain height="50" width="150" class="fixed_diponible"/>
    </div>
</template>

<script>
export default {
  name: "LandingPage"
}
</script>

<style scoped>


.fixed_diponible{
  position: absolute;
  bottom: 0;
  right: 0;
  border: black solid;
  border-radius: 12px;
  margin: 5px;
}

.fixed_text{
  position: absolute;
  top: 90px;
  left: 30%;
}

.v-application--is-ltr .v-responsive__sizer ~ .v-responsive__content{
  margin-left: 0;
}

.fixed_landing{
  width:50%;
  height:50%;
  position: absolute;
  bottom: 0;
  left:0 ;
}

</style>