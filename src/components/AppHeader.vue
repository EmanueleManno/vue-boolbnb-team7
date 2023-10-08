<script>
import axios from 'axios';
import apiClient from '../js/api';
import { store } from '../js/store.js';
const user_endpoint = 'http://localhost:8000/api/user';


export default {
    data() {
        return {
            user: '',
            searchedText: '',
            locations: [],
            timeout: null,
            store: store,
            address: null,
            lat: null,
            lon: null,
            loading: true
        };
    },
    methods: {
        // Get user details
        fetchUser() {
            axios.get(user_endpoint).then(res => { this.user = res.data; this.loading = false });
        },

        // Get First letter of a string
        getFirstLetter: (word) => (word.substring(0, 1).toUpperCase()),


        searchLocation() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(this.findLocation, 500);
        },

        // Go to Filter Page
        goToFilterPage(router, address, lat, lon) {
            router.push({ name: 'search', query: { address, lat, lon } })
        },

        checkIfBlank() {
            if (this.searchedText === '') {
                this.address = '';
                this.lat = '';
                this.lon = '';
            }
        },

        // Find the position
        findLocation() {
            if (this.searchedText !== '') {
                this.store.show = true;
                apiClient.get(`${encodeURIComponent(this.searchedText)}.json?limit=5&countrySet=IT`)
                    .then(response => {
                        this.locations = response.data.results;
                    })
                    .catch(error => {
                        console.error('Errore durante la ricerca del luogo:', error);
                    });
            }
            else {
                this.locations = [];
                this.store.show = false;
            }
        },

        // Get latitude, longitude and value
        selectAddress(value, address, lat, lon, router) {
            this.searchedText = value;
            this.address = address;
            this.lat = lat;
            this.lon = lon;

            this.goToFilterPage(router, address, lat, lon)
        }
    },

    watch: {
        '$route': {
            handler(newRoute) {
                if (newRoute.name !== 'search') this.searchedText = '';
                else this.searchedText = this.$route.query.address ? this.$route.query.address : '';
            }
        }
    },

    created() {
        this.fetchUser();
    }
}

</script>

<template>
    <header class="sticky-top">
        <div class="container">
            <div class="row px-2 px-sm-0">

                <!-- Left side -->
                <div class="col-md-1 col-xl-4 d-none d-md-flex justify-content-start">
                    <RouterLink :to="{ name: 'home' }" class="logo">
                        <img src="src/assets/img/logo.png" alt="logo">
                        <h1 class="d-none d-xl-inline-block">boolbnb</h1>
                    </RouterLink>
                </div>

                <!--!! Search bar -->
                <div class="col-10 col-md-6 col-xl-4 d-flex align-items-center searchbox">

                    <!-- Address Search Form -->
                    <form @submit.prevent="goToFilterPage($router, address, lat, lon)" class="search-bar">

                        <input v-model.trim="searchedText" type="text" class="form-control" placeholder="Inserisci un luogo"
                            @keyup="searchLocation">

                        <span v-if="searchedText.length" class="remove-text" @click="searchedText = ''">
                            <font-awesome-icon :icon="['fas', 'x']" />
                        </span>

                        <button type="submit" class="input-icon" @click="checkIfBlank">
                            <font-awesome-icon icon="magnifying-glass" />
                        </button>
                    </form>

                    <!-- Address Modal -->
                    <div class="filter-modal" :class="{ 'hide': !store.show }">
                        <ul>
                            <li v-for="location in this.locations"
                                @click="selectAddress(`${location.address.freeformAddress} ${location.address.countrySubdivision}`, location.address.freeformAddress, location.position.lat, location.position.lon, $router)">

                                <div class="searched-result">
                                    <div class="location-dot"><font-awesome-icon :icon="['fas', 'location-dot']" /></div>
                                    <span>{{ location.address.freeformAddress }}</span>
                                </div>

                            </li>
                        </ul>
                    </div>

                </div>

                <!-- Right side -->
                <div class="col-2 col-md-5 d-flex col-xl-4 justify-content-end gap-2">
                    <div class="d-none d-md-flex">
                        <a href="http://127.0.0.1:8000/admin/apartments/create" class="button-light">Apri un Boolbnb</a>

                        <button class="button-light"><font-awesome-icon icon="globe" /></button>
                    </div>

                    <!-- Dropdown -->
                    <div class="login-menu dropdown">
                        <button class="dropdown-toggle d-none d-md-flex align-items-center" data-bs-toggle="dropdown">
                            <font-awesome-icon icon="bars" />

                            <div v-if="loading" class="user ms-2">
                                <div class="spinner-border" role="status" style="width: 15px; height: 15px;">
                                </div>
                            </div>

                            <div v-else-if="user.length && !loading" class="user ms-2">
                                <span id="admin-name">{{ getFirstLetter(user[0]['name']) }}</span>
                            </div>

                            <div v-else class="user ms-2">
                                <font-awesome-icon icon="user" />
                            </div>

                        </button>

                        <button class="dropdown-toggle d-flex d-md-none align-items-center" data-bs-toggle="dropdown">
                            <div class="user">
                                <div v-if="loading" class="spinner-border" role="status" style="width: 15px; height: 15px;">
                                </div>

                                <span v-else-if="user.length && !loading" id="admin-name">{{ getFirstLetter(user[0]['name'])
                                }}</span>

                                <font-awesome-icon v-else icon="user" />
                            </div>
                        </button>

                        <ul v-if="user.length" class="dropdown-menu">
                            <li><a class="dropdown-item" href="http://127.0.0.1:8000/admin/apartments">I miei
                                    Boolbnb</a>
                            </li>
                            <li><a class="dropdown-item " href="http://127.0.0.1:8000/admin">Il mio Profilo</a></li>
                            <li><a class="dropdown-item" href="http://127.0.0.1:8000/login">Messaggi</a></li>
                            <li><a class="dropdown-item disabled" href="#">Notifiche</a></li>
                            <hr>
                            <li><a class="dropdown-item" href="http://127.0.0.1:8000/admin/apartments/create">Apri un
                                    Boolbnb</a>
                            </li>
                            <li><a class="dropdown-item" href="http://127.0.0.1:8000/profile">Account</a></li>
                            <hr>
                            <li>
                                <RouterLink class="dropdown-item" :to="{ name: 'home' }">Torna alla Home</RouterLink>
                            </li>
                        </ul>

                        <ul v-else class="dropdown-menu">
                            <li><a class="dropdown-item" href="http://127.0.0.1:8000/login"><b>Accedi</b></a></li>
                            <li><a class="dropdown-item" href="http://127.0.0.1:8000/register">Registrati</a></li>
                            <li>
                                <RouterLink class="dropdown-item" :to="{ name: 'home' }">Torna alla Home</RouterLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@use '../assets/scss/vars' as *;


//__________________ HEADER
header {
    border-bottom: 1px solid $light-grey;
    background-color: white;

    .row {
        @include flex($wrap: nowrap);
        height: 80px;
    }

    div[class*="col"] {
        padding: 0;
        height: 48px
    }

    .dropdown-toggle:after {
        display: none;
    }
}

// _____________ Left side
.logo {
    @include flex;

    img {
        width: 35px;
        margin-right: 5px;
        filter: brightness(0) saturate(100%) invert(36%) sepia(43%) saturate(4027%) hue-rotate(328deg) brightness(99%) contrast(105%);
    }

    h1 {
        @include font(700, 25px, $color: $brand-color, $spacing: -1px);
    }
}

//_____________ Searchbar
.search-bar {
    @include flex;
    flex-grow: 1;
    padding: 0;
    border: 1px solid $light-grey;
    border-radius: 40px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: box-shadow 0.2s cubic-bezier(0.2, 0, 0, 1);
    overflow: hidden;

    &:hover {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
    }
}

.searchbox {
    position: relative;
}

// Address Modal
.filter-modal {
    width: 100%;
    height: 300px;
    background-color: white;
    border-radius: 10px;
    position: absolute;
    bottom: -300px;
    left: 0;
    padding: 20px;
    box-shadow: 0 0 8px 4px rgba($color: #000, $alpha: 0.1);

    ul {
        @include flex(space-between, stretch, column);
        height: 100%;
    }
}

.location-dot {
    @include square(40px, 10px);
    @include flex;
    flex: 0 0 40px;
    background-color: #ebebeb;
}

.searched-result {
    @include flex(start, $gap: 15px);
    flex-basis: 100%;
    cursor: pointer;
}

li {
    padding: 3px 10px;
}

li:hover {
    background-color: rgb(245, 245, 245);
}

.hide {
    display: none;
}

// Input 
.form-control {
    border: none;
    padding: 0 12px;

    &:focus {
        border: none;
        box-shadow: none;
    }
}

.remove-text {
    margin-right: 10px;
    cursor: pointer;
}

// Search icon
.input-icon {
    @include flex;
    border-radius: 0 50% 50% 0;
    padding: 12px;
    color: white;
    background-color: $brand-color;
}

//_____________ Right side
.login-menu {
    @include flex;
}

.user {
    @include circle(40px);
    @include flex;
    color: white;
    background-color: black;
}

ul.dropdown-menu.show {
    @include font();
}

@media (min-width: 768px) {
    .login-menu {
        padding: 0 6px 0 10px;
        border: 1px solid $light-grey;
        border-radius: 40px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05);
        transition: box-shadow 0.2s cubic-bezier(0.2, 0, 0, 1);

        &:hover {
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
        }
    }

    .user {
        @include circle(30px);
    }
}
</style>