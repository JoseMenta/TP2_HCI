<template>
<!--  <div class="d-flex justify-space-between horizontal ml-2 mr-3 toolbar-style">-->
    <v-row class="justify-space-between row">
      <SearchBox class="elements-style" language="es" :search-method="search" :search-box-width="450" :icon-size="40" :btn-border-radius="12" :text-size="20"/>
      <v-spacer></v-spacer>
      <ProfileButton class="elements-style" :profile-method="profile" :btn-height="50" user-name="Raul Sarmiento" :user-name-img="require('@/assets/avatar.jpg')" :img-size="30" :btn-border-radius="12" :img-border-radius="4" :text-size="16"/>
    </v-row>
    <!--  </div>-->
</template>

<script>
import SearchBox from "@/components/SearchBox";
import ProfileButton from "@/components/ProfileButton";
export default {
  name: "TopBarMenu",
  components: {
    ProfileButton,
    SearchBox
  },
  methods:{
    search(){
      alert("Searching...")
    },
    profile(){
      alert("Open Profile");
    }
  }
}
</script>

<style scoped>
.row{
  width: 100%;
  background-color: var(--v-white-base);
}
.toolbar-style {
  width: 100%;
}

.elements-style {
  margin-top: 20px;
}


</style>