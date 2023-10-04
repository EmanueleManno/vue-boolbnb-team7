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
        // Get all services
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
        // Services not available in the apartment
        serviceNotAvailable() {
            // Services of the apartament (Available Services)
            const avServ = this.apartment.services;

            // Array with ids of available services
            let avServId = [];
            avServ.forEach(s => {
                avServId.push(s.id)
            });

            // Array with services not available
            let notAv = [];
            this.services.forEach(s => {
                if (!avServId.includes(s.id)) {
                    notAv.push(s);
                }
            });

            return notAv;
        },
        getServiceClass() {
            if (this.apartment.services.length <= 5) {
                return 'services-small'
            } else if (this.apartment.services.length <= 10) {
                return 'services-medium'
            } else if (this.apartment.services.length > 10) {
                return 'services-large'
            }
        }

    },
    created() {
        this.getApartment();
        this.fetchServices();

    },
    mounted() {
        this.getMap();
    }
}
</script>

<template>
    <!-- {{ services }} -->
    <main>
        <!-- Header -->
        <header>
            <div class="container">
                <h2>{{ apartment.title }}</h2>
            </div>
        </header>

        <div class="container">
            <!-- Image -->
            <div class="slider">
                <div></div>
                <div v-if="apartment.image" class="image-container">
                    <img :src="`http://127.0.0.1:8000/storage/${apartment.image}`" :alt="apartment.title">
                </div>
                <!-- Without image -->
                <div v-else class="no-image">
                    <div class="icon">
                        <img src="../assets/img/camera.png" alt="camera">
                    </div>
                    <h3>L'host non ha ancora inserito immagini, contattalo per saperne di più!</h3>
                    <a href="#message-form"><font-awesome-icon :icon="['fas', 'arrow-down']" bounce size="2xl" /></a>
                </div>
                <div></div>
            </div>

            <!-- Information -->
            <section id="apartments-details">
                <div>
                    <!-- Address -->
                    <h3 class="mb-2">{{ apartment.address }}</h3>
                    <!-- Rooms -->
                    <ul>
                        <li>{{ apartment.rooms + ' ' + (apartment.rooms == 1 ? 'camera' : 'camere') }}</li>
                        <span>-</span>
                        <li>{{ apartment.beds + ' ' + (apartment.beds == 1 ? 'letto' : 'letti') }}</li>
                        <span>-</span>
                        <li>{{ apartment.bathrooms + ' ' + (apartment.bathrooms == 1 ? 'bagno' : 'bagni') }}</li>
                    </ul>
                </div>
                <!-- Host information -->
                <hr v-if="apartment.user.name">
                <div v-if="apartment.user.name" class="d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center gap-4">
                        <div class="user">{{ getFirstLetter(apartment.user.name) }}</div>
                        <h3>Nome dell'host: {{ capitalizeString(apartment.user.name) }}</h3>
                    </div>

                    <a href="#message-form" class="button button-light">Contatta {{ capitalizeString(apartment.user.name)
                    }}</a>
                </div>
                <hr>
                <!-- Description -->
                <div>
                    <h3 class="mb-2">Descrizione</h3>
                    <p>{{ apartment.description }}</p>
                </div>
                <hr>
                <!-- Services -->
                <div :id="getServiceClass()">
                    <h3 class="mb-3">Cosa troverai</h3>
                    <div>
                        <ul class="service-list">
                            <li v-for="service in apartment.services">
                                <div><img :src="`../src/assets/img/service/${service.image}`" :alt="service.name"></div>
                                <span>{{ service.name }}</span>
                            </li>
                        </ul>
                        <div class="services">
                            <h2>Scopri i servizi non inclusi</h2>
                            <div>
                                <!-- Modal Button -->
                                <button type="button" class="services-button button button-light" data-bs-toggle="modal"
                                    data-bs-target="#serviceModal">Mostra tutti i {{ services.length }}
                                    servizi </button>
                            </div>
                        </div>

                        <!-- Modal -->
                        <div class="modal fade modal-lg" id="serviceModal" tabindex="-1" aria-labelledby="serviceModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <h3 class="mb-3">Cosa troverai</h3>
                                        <ul class="service-list">
                                            <li v-for="service in apartment.services">
                                                <div><img :src="`../src/assets/img/service/${service.image}`"
                                                        :alt="service.name"></div>
                                                <span>{{ service.name }}</span>
                                            </li>
                                        </ul>
                                        <h3 class="mt-5 mb-3">Non incluso</h3>
                                        <ul class="service-list">
                                            <li v-for="service in serviceNotAvailable()">
                                                <div><img :src="`../src/assets/img/service/${service.image}`"
                                                        :alt="service.name"></div>
                                                <span class="text-decoration-line-through">{{ service.name }}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Map -->
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
                    <button class="button button-light">Invia messaggio</button>
                </section>
            </section>
        </div>
    </main>
</template>

<style lang="scss" scoped>
@use '../assets/scss/vars' as *;

//_______ HEADER
header {
    padding: 24px 0;
}

// Apartment image
.slider {
    display: flex;
}

.slider div:empty {
    background-color: $light-grey;
    flex-grow: 1;
    border-radius: 20px;
}

// If there is
.image-container {
    @include square(calc(100vw - 24px), 20px);
    @include max-size($max: true, $max-width: 100%, $max-height: 360px);
    overflow: hidden;
}

img {
    @include max-size;
    object-fit: cover;
}

// If there in not image
.no-image {
    border: 1px solid $light-grey;
    border-radius: 15px;
    padding: 15px;
    @include flex($direction: column, $gap: 20px);

    .icon {
        @include flex;
        width: 30%;

        img {
            width: 100%;
            filter: invert(44%) sepia(52%) saturate(6771%) hue-rotate(329deg) brightness(101%) contrast(101%);
        }
    }
}

// INFORMATION
#apartments-details>div {
    padding: 24px 0;
}

h3 {
    font-size: 18px;
    text-wrap: wrap
}

ul {
    display: flex;
    gap: 20px;
    font-size: 16px;
}

// Host information
.user {
    @include circle(calc(40px + 2vw));
    @include flex;
    font-size: calc(10px + 2vw);
    color: white;
    background-color: black;
}

// Services
.service-list {
    @include flex(stretch, stretch, column, wrap, 20px);
    max-height: 400px;
    flex-grow: 1;

    li {
        @include flex(start, center, $gap: 7px);
        border: 1px solid $light-grey;
        border-radius: 15px;
        padding: 10px;

        div {
            @include square(30px);
            overflow: hidden;

            img {
                @include max-size;
                object-fit: contain;
                filter: brightness(0) saturate(100%);
            }
        }
    }
}

#services-large .service-list {
    max-height: 800px;
}

.services-button,
#services-large .services {
    display: flex;
}

.services {
    @include flex(center, center, column, $gap: 10px);
    padding: 20px 0;
}

#services-medium .services h2,
#services-large .services h2 {
    display: none;
}

#services-small>div,
#services-medium>div,
#services-large>div {
    display: flex;
    flex-direction: column;
}

// Map
#map {
    height: 480px;
    border-radius: 15px;
}

// Section message
#message-form {
    padding: 24px 0;
}

// MEDIA QUERY
@media (min-width: 576px) {
    #services-small .services {
        flex-basis: 50%;
        padding: 20px;
    }

    #services-large .service-list {
        max-height: 400px;
    }
}

@media (min-width: 768px) {
    .image-container {
        @include max-size($max: true, $max-width: 696px, $max-height: 400px);
    }

    .no-image {
        margin: 0 20px;
    }

    #services-medium .services {
        flex-basis: 50%;
        padding: 20px;

        h2 {
            display: flex;
        }
    }

    #services-small>div,
    #services-medium>div {
        flex-direction: row;
    }
}

@media (min-width: 992px) {
    .slider {
        gap: 20px;
    }

    .no-image {
        margin: 0;
    }
}
</style>