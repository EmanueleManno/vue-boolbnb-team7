<script>
import axios from 'axios';
import apiClient from '../js/api'
const user_endpoint = 'http://localhost:8000/api/user';


export default {


    data() {
        return {
            user: '',
            searchedText: '',
            locations: [],
            timeout: null,
            show: false,
            
        }
    },
    methods: {
        // Get user deatils
        fetchUser() {
            axios.get(user_endpoint).then(res => { this.user = res.data })
        },
        // Get First letter of a string
        getFirstLetter: (word) => (word.substring(0, 1).toUpperCase()),
        
        searchLocation() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(this.findLocation, 500);

        },

        findLocation(){

            if(this.searchedText !== ''){

                this.show = true;
                apiClient.get(`${encodeURIComponent(this.searchedText)}.json?limit=5`)
                .then(response => {
                    
                    this.locations = response.data.results;
                    
                })
                .catch(error => {
                    console.error('Errore durante la ricerca del luogo:', error);
                });

            } else {
                this.locations = [];
                this.show = false;
            }

        },

        setText(value){
            this.searchedText = value
        }
    },

    created() {
        this.fetchUser();
    },
}

</script>

<template>
    <header class="sticky-top">
        <div class="container">
            <div class="row px-2 px-sm-0">
                <!-- Left side -->
                <div class="col-md-1 col-xl-4 d-none d-md-flex justify-content-start">
                    <a class="logo" href="http://localhost:5174/">
                        <img src="src/assets/img/logo.png" alt="logo">
                        <h1 class="d-none d-xl-inline-block">boolbnb</h1>
                    </a>
                </div>

                <!--!! Search bar -->
                <div class="col-10 col-md-6 col-xl-4 d-flex align-items-center searchbox">
                    <form class="search-bar">
                        <input v-model.trim="searchedText" type="text" class="form-control"
                            placeholder="Inserisci un luogo" @keyup="searchLocation">
                        <button class="input-icon"><font-awesome-icon icon="magnifying-glass" /></button>
                    </form>
                    <!-- Modal -->
                    <div class="filter-modal" :class="{ 'hide': !this.show }">
                        <ul>
                            <li class="searched-result" v-for="location in this.locations" @click="setText(`${location.address.countrySecondarySubdivision} ${location.address.countrySubdivision}`)">
                                {{ location.address.country }} {{ location.address.countrySubdivision }} {{ location.address.countrySecondarySubdivision }}
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
                            <div v-if="user.length" class="user ms-2">
                                <span id="admin-name">{{ getFirstLetter(user[0]['name']) }}</span>
                            </div>

                            <div v-else class="user ms-2">
                                <font-awesome-icon icon="user" />
                            </div>
                        </button>

                        <button class="dropdown-toggle d-flex d-md-none align-items-center" data-bs-toggle="dropdown">
                            <div class="user">
                                <font-awesome-icon icon="user" />
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
                        </ul>

                        <ul v-else class="dropdown-menu">
                            <li><a class="dropdown-item" href="http://127.0.0.1:8000/login"><b>Accedi</b></a></li>
                            <li><a class="dropdown-item" href="http://127.0.0.1:8000/register">Registrati</a></li>
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


// Modal
.searchbox {
    position: relative;

    .filter-modal {
    width: 100%;
    height: 200px;
    background-color: white;
    border-radius: 40px;
    position: absolute;
    bottom: -190px;
    left: 0;

}

    .searched-result {
        padding-top: 5px;
        padding-left: 10px;
        font-size: 20px;
        padding-bottom: 7px;
        cursor: pointer;

        &:hover {
            background-color: rgb(238, 234, 234);
            border-radius: 40px;
        }
    }


    
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