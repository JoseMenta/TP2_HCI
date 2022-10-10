<template>

  <v-app>
    <!-- <NavigationDrawer/>  ya tiene en su interior la estructura necesaria
    <v-navigation-drawer app>
    </v-navigation-drawer>
    -->
    <NavigationDrawer v-if="needNavigation()"/>

    <v-app-bar v-if="needNavigation()" app color="white" prominent dense>
      <TopBarMenu/>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <div v-if="needNavigation()">
        <TopBreadcrums :items="[{text: 'Lionel', disabled: false, href: 'Lionel',},
      { text: 'Andres', disabled: false, href: 'Andres', },
      { text: 'Messi', disabled: false, href: 'Messi', },]"
                       class="ml-7 py-3"/>
      </div>
      <hr v-if="needNavigation()">
<!--      <CreatedRoutinesView language="en"/>-->
      <!-- Provides the application the proper gutter -->
        <!-- If using vue-router -->
        <router-view :key="$route.path"></router-view>
    </v-main>

  </v-app>

<!--  <v-app>

    <v-app-bar app color="white" prominent dense>
      <TopBarMenu/>
    </v-app-bar>

    <v-main>
      <div>
        <TopBreadcrums :items="[{text: 'Lionel', disabled: false, href: 'Lionel',},
      { text: 'Andres', disabled: false, href: 'Andres', },
      { text: 'Messi', disabled: false, href: 'Messi', },]"
                       class="ml-7 py-3"/>
      </div>
      <hr>
&lt;!&ndash;      Usar v-bind cuando se quiere pasar algo que no sea un String&ndash;&gt;
&lt;!&ndash;      Es equivalente a hacer : antes de la propiedad&ndash;&gt;
&lt;!&ndash;      Uso de routine card&ndash;&gt;
&lt;!&ndash;      <RoutineCard img="lionel-messi.webp" name="Futbol para adsandasjkdbahkbjdsbasdhbahds" v-bind:is-favorite="true" v-bind:id="1"
      @favoriteTouched="changeFavorite" v-bind:stars="3"
      v-bind:tags="['hello','world','How','Are','You','Welcome','To','Fiti']"></RoutineCard>
      <ExerciseCard :name="'Abdominales'" :id="1" description="Es un ejercicio dificil que no se logra completar si se come mucho antes de realizarlo pues desdulta masydasd" img="estiramiento.png"></ExerciseCard>

      <ExerciseCardMin :id="1" img="lionel-messi.webp" name="Futbol para todos" :stars="3"></ExerciseCardMin>
      &lt;!&ndash;  Componentes agregados       &ndash;&gt;
      <LanguageSelect :id="1" v-bind:options="['Español','English']" v-bind:abrev="['ESP','ENG']"
                  @menuChanged="changeMenu"  :width="100" ></LanguageSelect>
      <ExerciseList :id="1"  name="Burpees" img="Burpee.jpg" time="00:40" clase="blue"/>
      <ControlsRutine></ControlsRutine>
      <BinaryFilter v-bind:filters="['Nombre de Rutina','Nombre del Creador']" :width="200" :height="40"/>
      <newTask name="Agregar Ejercicio" icon="fitness_center" :width="250" :height="30"></newTask>
      <newTask name="Agregar Descanso" icon="history_toggle_off" :width="250" :height="30"></newTask>
      <TopBreadcrums :items="[{text: 'Dashboard', disabled: false, href: 'breadcrumbs_dashboard',},
      { text: 'Link 1', disabled: false, href: 'breadcrumbs_link_1', },
      { text: 'Link 2', disabled: true, href: 'breadcrumbs_link_2', },]"></TopBreadcrums>
      <FilterMenu :id="1" v-bind:options="['Buenas','Tardes','Como','Estas']"  :width="150" @menuChanged="changeMenu" :left-border-radius="4" :right-border-radius="4"></FilterMenu>
      <ExerciseCategory :id="1" name="Tardes" :width="150" :height="30"></ExerciseCategory>


      &lt;!&ndash; Ejemplos de los componentes creados por Axel &ndash;&gt;
      &lt;!&ndash; Primero se debe importar en <script> &ndash;&gt;
      <IconTextCircle :size="160" icon="mdi-replay" :icon-size="38" text="10" :text-size="48"/>
      <IconTextCircleTimer :size="160" :seconds="10" :minutes="0" :text-size="48"/>
      <ViewSwitch :items="[ {text: 'Detalle'}, {text: 'Lista'} ]" :text-size="24" :border-radius="12"/>
      <LoginButton :text-size="30" text="Regístrate" :border-radius="12"/>
      <SearchBox language="en" :search-method="search" :search-box-width="450" :icon-size="40" :btn-border-radius="12" :text-size="20"/>
      <ProfileButton :profile-method="profile" :btn-height="50" user-name="Raul Sarmiento" :user-name-img="require('@/assets/Burpee.jpg')" :img-size="30" :btn-border-radius="12" :img-border-radius="4" :text-size="16"/>
      <NumberSelector :component-width="190" :text-size="16" :component-border-radius="4" data-text="Repeticiones" :data-value="5"/>
      <TimeSelector :text-size="16" :minutes="0" :seconds="0" :component-border-radius="4" :component-width="190" data-text="Tiempo"/>
      <PasswordInput password="FYTY"></PasswordInput>
      <ExerciseDetail language="es" :read-only="false" :title-size="30" :textarea-size="20" :textarea-border-radius="12"/>
      <TextInput label="hola"></TextInput>
      <LoginView></LoginView>
      <ExerciseDetail language="es" :read-only="false" :title-size="30" :textarea-size="20" :textarea-border-radius="12"/>&ndash;&gt;

      <NavigationDrawer/>
      <CreatedRoutinesView language="en"/>
    </v-main>
  </v-app>-->
</template>

<script>
import NavigationDrawer from "@/components/NavigationDrawer";
import TopBarMenu from "@/components/TopBarMenu";
import TopBreadcrums from "@/components/TopBreadcrums";

export default {
  name: 'App',

  components: {
    NavigationDrawer,
    TopBarMenu,
    TopBreadcrums
  },
  data: () => ({
    //
  }),
  methods:{
    changeFavorite(id,status){
      console.log(id)
      console.log(status)
    },
    changeMenu(menuId,newValue){
      console.log(menuId)
      console.log(newValue)
    },
    search(){
      alert("Searching...")
    },
    profile(){
      alert("Open Profile");
    },
    needNavigation(){
      return !(['landing', 'register1', 'register2', 'login', 'resendVerification', 'verification'].includes(this.$route.name))
    }
  }
};
</script>

<style>


</style>
