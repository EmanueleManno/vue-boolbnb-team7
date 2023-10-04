<script>
const services = [
    { id: 1, 'name': 'Wi-Fi', 'icon': 'wifi' },
    { id: 2, 'name': 'TV', 'icon': 'tv' },
    { id: 3, 'name': 'Lavatrice', 'icon': 'soap' },
    { id: 4, 'name': 'Asciugatrice', 'icon': 'temperature-high' },
    { id: 5, 'name': 'Ferro da stiro', 'icon': 'shirt' },
    { id: 6, 'name': 'Asciugacapelli', 'icon': 'tornado' },
    { id: 7, 'name': 'Cucina', 'icon': 'kitchen-set' },
    { id: 8, 'name': 'Aria Condizionata', 'icon': 'temperature-arrow-down' },
    { id: 9, 'name': 'Riscaldamento', 'icon': 'temperature-arrow-up' },
    { id: 10, 'name': 'Posto Macchina', 'icon': 'car' },
    { id: 11, 'name': 'Piscina', 'icon': 'water-ladder' },
    { id: 12, 'name': 'Portineria', 'icon': 'bell-concierge' },
    { id: 13, 'name': 'Sauna', 'icon': 'house-tsunami' },
    { id: 14, 'name': 'Vista Mare', 'icon': 'water' },
]
export default {
    data: () => ({
        services,
        filters: {
            rooms: null,
            beds: null,
            radius: 20,
            services: [],
        }
    }),
    methods: {
        applyFilters() {

            // Create query params
            const query = {
                lat: this.$route?.query.lat,
                lon: this.$route?.query.lon,
                ...this.filters
            }

            // Apply query
            this.$router.push({ name: 'search', query })
        }
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
                                <label for="radius" class="form-label fw-bold">Raggio ricerca [km]</label>
                                <input v-model.trim="filters.radius" type="number" class="form-control" id="radius">
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