<script>
import axios from 'axios';
import { store } from '../../js/store';
const endpoint = 'http://127.0.0.1:8000/api/services';

export default {
    data: () => ({
        services: [],
        filters: {
            rooms: null,
            beds: null,
            radiusKm: 20,
            services: [],
        },
        store: store,
        
    }),
    computed: {
        radius() {
            return parseInt(this.filters.radiusKm) * 1000;
        }
    },
    methods: {
        fetchServices() {

            axios.get(endpoint)
                .then(res => {
                    this.services = res.data;
                })
                .catch(err => {
                    console.error(err);
                });

        },

        applyFilters() {

            // Create query params
            const query = {
                lat: this.$route?.query.lat,
                lon: this.$route?.query.lon,
                rooms: this.filters.rooms,
                beds: this.filters.beds,
                radius: this.radius,
                services: this.filters.services,
            }

            // Apply query
            this.$router.push({ name: 'search', query })
            this.addFilters();
        },

        // Check if are any filters in the URL
        assignFilters() {

            if(this.$route?.query.rooms > 0) {
                this.filters.rooms = this.$route?.query.rooms;
            };

            if(this.$route?.query.beds > 0) {
                this.filters.beds = this.$route?.query.beds;
            };

        },

        addFilters(){
            if(this.filters.rooms){
                this.store.filters += 1;
            };
            
            if(this.filters.beds) {
                this.store.filters += 1;
            }
        }
    },

    created() {
        this.fetchServices();
        this.assignFilters();
        this.addFilters();

    }
}
</script>


<template>
    <div class="modal fade" id="searchModal" tabindex="-1" aria-hidden="true">

        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

                <!-- Header -->
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Filtri</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <!-- Body -->
                <div class="modal-body">

                    <!-- Filters -->
                    <form @submit.prevent="applyFilters" class="container-fluid">
                        <div class="row">

                            <!-- Rooms -->
                            <div class="col-12 col-sm-4 mb-3">
                                <label for="rooms" class="form-label fw-bold">Numero di stanze</label>
                                <input v-model.trim="filters.rooms" type="number" class="form-control" id="rooms">
                            </div>

                            <!-- Beds -->
                            <div class="col-12 col-sm-4 mb-3">
                                <label for="beds" class="form-label fw-bold">Numero di letti</label>
                                <input v-model.trim="filters.beds" type="number" class="form-control" id="beds">
                            </div>

                            <!-- Radius -->
                            <div class="col-12 col-sm-4 mb-3">
                                <label for="radiusKm" class="form-label fw-bold">Raggio ricerca [km]</label>
                                <input v-model.trim="filters.radiusKm" type="number" class="form-control" id="radiusKm">
                            </div>

                            <!-- Services -->
                            <div class="col-12 mb-3">
                                <p class="fw-bold mb-2">Servizi</p>
                                <div class="row">
                                    <div v-for="service in services" :key="service.id" class="col-6 form-check">
                                        <input v-model.trim="filters.services" class="form-check-input" type="checkbox"
                                            :id="service.id" :value="service.id">
                                        <label class="form-label d-block" :for="service.id">{{ service.name
                                        }}</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Actions -->
                            <div class="col-12 border-top text-end pt-3">
                                <button type="button" class="btn btn-secondary">Cancella Tutto</button>
                                <button type="submit" class="btn btn-success ms-2" data-bs-dismiss="modal">Mostra</button>
                            </div>

                        </div>
                    </form>
                </div>

            </div>
        </div>

    </div>
</template>


<style></style>