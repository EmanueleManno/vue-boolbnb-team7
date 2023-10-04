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
        errorMessage: ''
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
            this.errorMessage = '';

            // Get query
            const params = this.$route.query;


            // Call API
            axios.get(endpoint, { params })
                .then(res => {
                    this.apartments = res.data;
                })
                .catch(err => {
                    console.error(err.response.data);
                    const status = err.response.status;

                    if (status === 400) {
                        this.errorMessage = 'Inserisci un indirizzo valido.';
                    } else {
                        this.errorMessage = `Errore ${status}`;
                    }
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
        <!-- Navbar -->
        <AppNavbar />

        <!-- Page Cotent -->
        <div v-if="!isLoading">

            <!-- Error Message -->
            <div v-if="errorMessage" class="container">
                <h4 class="text-danger text-center mt-5">{{ errorMessage }}</h4>
            </div>

            <!-- Apartments -->
            <ApartmentsList v-else :apartments="apartments" />
        </div>
    </main>

    <!-- Loader -->
    <AppLoader :is-loading="isLoading" />
</template>