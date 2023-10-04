<script>
import axios from 'axios';
// TomTom Map
import tt from "@tomtom-international/web-sdk-maps";
import '@tomtom-international/web-sdk-maps/dist/maps.css';
const apartment_endpoint = 'http://localhost:8000/api/apartments/';
const services_endpoint = 'http://localhost:8000/api/services'

export default {
    data() {
        return {
            apartment: '',
            services: [],
        }
    },
    methods: {
        // Services
        fetchServices() {
            axios.get(services_endpoint).then(res => { this.services = res.data })
        },
        // Get apartment details
        getApartment() {
            axios.get(apartment_endpoint + this.$route.params.id).then(res => { this.apartment = res.data })
        },
        // Get First letter of a string
        getFirstLetter: (word) => (word.substring(0, 1).toUpperCase()),
        // Capitalize a string
        capitalizeString: (word) => (word.charAt(0).toUpperCase() + word.slice(1)),
        // TomTom Map
        getMap() {
            if (this.apartment.address) {
                const mapContainer = document.getElementById('map');
                const lat = mapContainer.dataset.latitude;
                const lon = mapContainer.dataset.longitude;
                const map = tt.map({
                    key: import.meta.env.VITE_TT_API_KEY,
                    container: mapContainer,
                    center: [lon, lat],
                    zoom: 8
                });
                map.addControl(new tt.NavigationControl());
                const marker = new tt.Marker().setLngLat([lon, lat]).addTo(map);
            }
        },
    },
    created() {
        this.getApartment();
        this.fetchServices()
    },
    mounted() {
        this.getMap();
    }
}
</script>

<template>
    <main>
        <!-- Header -->
        <header>
            <div class="container">
                <h2>{{ apartment.title }}</h2>
            </div>
        </header>

        <div class="container">
            <div class="slider">
                <div></div>
                <!-- Image -->
                <div class="image-container">
                    <img :src="`http://127.0.0.1:8000/storage/${apartment.image}`" :alt="apartment.title">
                </div>
                <div></div>
            </div>

            <!-- Information -->
            <section id="apartments-details">
                <div>
                    <h3 class="mb-2">{{ apartment.address }}</h3>
                    <ul>
                        <li>{{ apartment.rooms + ' ' + (apartment.rooms == 1 ? 'camera' : 'camere') }}</li>
                        <span class="separator">-</span>
                        <li>{{ apartment.beds + ' ' + (apartment.beds == 1 ? 'letto' : 'letti') }}</li>
                        <span class="separator">-</span>
                        <li>{{ apartment.bathrooms + ' ' + (apartment.bathrooms == 1 ? 'bagno' : 'bagni') }}</li>
                    </ul>
                </div>
                <hr v-if="apartment.user.name">
                <div v-if="apartment.user.name" class="d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center gap-4">
                        <div class="user">{{ getFirstLetter(apartment.user.name) }}</div>
                        <h3>Nome dell'host: {{ capitalizeString(apartment.user.name) }}</h3>
                    </div>

                    <a href="#message-form" class="button-light">Contatta {{ capitalizeString(apartment.user.name) }}</a>
                </div>
                <hr>
                <div>
                    <h3 class="mb-2">Descrizione</h3>
                    <p>{{ apartment.description }}</p>
                </div>
                <hr>
                <div>
                    <h3 class="mb-3">Cosa troverai</h3>
                    <ul class="service-list">
                        <li v-for="service in apartment.services">
                            <img :src="`src/assets/img/service/${service.image}`" :alt="service.name">
                            {{ service.name }}
                        </li>
                    </ul>
                </div>
                <hr v-if="apartment.address">
                <div v-if="apartment.address">
                    <h3 class="mb-3">Dove ti troverai</h3>
                    <div id="map" :data-latitude="apartment.latitude" :data-longitude="apartment.longitude"
                        style="height:480px"></div>
                    <div class="mt-2 fw-">{{ apartment.address }}</div>
                </div>
                <hr>
                <section id="message-form">
                    <h3 class="mb-3">Hai domande? Invia un messaggio all'host</h3>
                    <div class="form-floating">
                        <textarea class="form-control mb-4" placeholder="Leave a comment here" id="floatingTextarea"
                            style="height: 160px;"></textarea>
                    </div>
                    <button class="button-light">Invia messaggio</button>
                </section>
            </section>
        </div>
    </main>
</template>

<style lang="scss" scoped>
@use '../assets/scss/vars' as *;

hr {
    margin: 0;
}

#message-form {
    padding: 24px 0;
}

.button-light {
    border: 1px solid black;
    border-radius: 10px;
    padding: 13px 23px;
}

#map {
    height: 480px;
    overflow: hidden;
}

header {
    padding: 24px 0;
}

h3 {
    font-size: 18px;
}

.user {
    @include circle(calc(40px + 2vw));
    @include flex;
    font-size: calc(10px + 2vw);
    color: white;
    background-color: black;
}

.image-container {
    width: calc(100vw - 24px);
    height: calc(100vw - 24px);
    max-width: 100%;
    max-height: 360px;
    overflow: hidden;
    border-radius: 20px;
}

.slider {
    display: flex;
}

.slider div:empty {
    background-color: $light-grey;
    flex-grow: 1;
    border-radius: 20px;
}

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

#apartments-details>div {
    padding: 24px 0;
}

ul {
    display: flex;
    gap: 20px;
    font-size: 16px;
}

.service-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

// Media Query
@media (min-width: 768px) {
    .image-container {
        max-height: 400px;
        max-width: 696px;
    }
}

@media (min-width: 992px) {
    .slider {
        gap: 20px;
    }
}
</style>