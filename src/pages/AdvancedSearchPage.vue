<script>
import AppNavbar from '../components/AppNavbar.vue';
import ApartmentsList from '../components/ApartmentsList.vue';
export default {
    components: { AppNavbar, ApartmentsList },
}
</script>

<template>
    <main>
        <AppNavbar />
        <ApartmentsList />
    </main>
</template>