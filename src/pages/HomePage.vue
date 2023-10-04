<script>
import AppNavbar from '../components/AppNavbar.vue';
import AppLoader from '../components/AppLoader.vue';
import ApartmentsList from '../components/apartment/ApartmentsList.vue';


import axios from 'axios';
const endpoint = 'http://127.0.0.1:8000/api/apartments'


export default {
    components: { AppNavbar, ApartmentsList, AppLoader },
    data: () => ({ apartments: [], isLoading: true }),
    methods: {
        fetchApartments() {
            axios.get(endpoint).then(res => { this.apartments = res.data; this.isLoading = false; });
        }
    },
    created() {
        this.fetchApartments();
    }
}
</script>

<template>
    <main>
        <!-- <AppNavbar /> -->
        <ApartmentsList :apartments="apartments" />
    </main>
    <!-- Loader -->
    <AppLoader :is-loading="isLoading" />
</template>