<script>
import AppNavbar from '../components/AppNavbar.vue';
import ApartmentsList from '../components/ApartmentsList.vue';

import axios from 'axios';
const endpoint = 'http://127.0.0.1:8000/api/apartments/filter';
import { store } from '../js/store';


export default {
    components: { AppNavbar, ApartmentsList },
    data: () => ({ apartments: [] }),

    methods: {
        fetchApartments() {
            const params = {
                lat: store.lat,
                lon: store.lon,
            };

            axios.get(endpoint, { params })
                .then(res => {
                    this.apartments = res.data;
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
</template>