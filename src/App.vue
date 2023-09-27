<script>
import AppHeader from './components/AppHeader.vue';
import AppNavbar from './components/AppNavbar.vue';
export default {
  components: { AppHeader, AppNavbar },
}
</script>

<template>
  <AppHeader />
  <AppNavbar />
  <RouterView />
</template>

<style lang="scss">
@use './assets/scss/style.scss';
</style>
