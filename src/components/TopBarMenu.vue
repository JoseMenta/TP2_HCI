<template>
  <div class="d-flex justify-space-between align-center ml-2 mr-3 toolbar-style">
    <SearchBox class="elements-style" placeholder="Buscar rutinas" :search-method="search" :filters="true" :search-box-width="450" :icon-size="40" :btn-border-radius="12" :text-size="20" language="es"/>
    <ProfileButton class="elements-style" :profile-method="profile" :btn-height="50" user-name="Raul Sarmiento" :user-name-img="require('@/assets/avatar.jpg')" :img-size="30" :btn-border-radius="12" :img-border-radius="4" :text-size="16"/>
  </div>
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

.toolbar-style {
  width: 100%;
}

.elements-style {
  margin-top: 10px;
}


</style>