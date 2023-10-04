<script>
import AppNavbar from '../components/AppNavbar.vue';
import AppLoader from '../components/AppLoader.vue';
import ApartmentsList from '../components/apartment/ApartmentsList.vue';

import axios from 'axios';
const endpoint = 'http://127.0.0.1:8000/api/apartments/filter';


export default {
    components: { AppNavbar, ApartmentsList, AppLoader },
    data: () => ({
        apartments: [],
        isLoading: true,
    }),

    watch: {
        '$route.query': {
            handler(newQuery) {
                this.fetchApartments();
            }
        }
    },

    methods: {
        fetchApartments() {

            this.isLoading = true;

            // Get query
            const params = this.$route.query;


            // Call API
            axios.get(endpoint, { params })
                .then(res => {
                    this.apartments = res.data;
                })
                .catch(err => {
                    console.error(err.response.data);
                })
                .then(() => {
                    this.isLoading = false;
                });
        }
    },
    created() {
        this.fetchApartments();
    }
}
</script>

<template>
    <main>
        <AppNavbar />
        <ApartmentsList :apartments="apartments" />
    </main>
    <!-- Loader -->
    <AppLoader :is-loading="isLoading" />
</template>