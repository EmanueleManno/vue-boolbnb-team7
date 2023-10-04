<script>
import AppNavbar from '../components/AppNavbar.vue';
import AppLoader from '../components/AppLoader.vue';
import ApartmentsList from '../components/ApartmentsList.vue';

import axios from 'axios';
const endpoint = 'http://127.0.0.1:8000/api/apartments/filter';


export default {
    components: { AppNavbar, ApartmentsList, AppLoader },
    data: () => ({
        apartments: [],
        isLoading: false,
    }),

    computed: {
        lat() {
            return this.$route?.query.lat;
        },
        lon() {
            return this.$route?.query.lon;
        },
    },

    watch: {
        lat: {
            handler(newLat, oldLat) {
                if (newLat != oldLat) {
                    this.fetchApartments();
                }
            }
        }
    },

    methods: {
        fetchApartments() {
            const params = {
                lat: this.lat,
                lon: this.lon
            };

            console.log(params);

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