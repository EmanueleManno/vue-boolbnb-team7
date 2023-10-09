<script>
import SearchModal from './search/SearchModal.vue';
import { store } from '../js/store.js';

import axios from 'axios';
const endpoint = 'http://localhost:8000/api/categories';


export default {
    components: { SearchModal },
    data: () => ({ categories: [], store:store }),
    methods: {
        fetchCategories() {
            axios.get(endpoint).then(res => { this.categories = res.data })
        }
    },
    created() {
        this.fetchCategories();
    },
    computed: {
        filterNumber(){

            return
        }
    }
}
</script>

<template>
    <nav class="bool-nav">
        <div class="container">
            <div class="row">

                <!-- Categories -->
                <ul class="col-10">
                    <li v-for="category in categories" :key="category.id">
                        <img :src="`src/assets/img/category/${category.img}`" :alt="category.name">
                        <div>{{ category.name }}</div>
                    </li>
                </ul>

                <!-- Advanced Filters -->
                <div class="col-2 d-flex align-items-center justify-content-end">
                    <button class="filter" data-bs-toggle="modal" data-bs-target="#searchModal" :class="{ 'has-filter': store.filters > 0 }">
                        <font-awesome-icon icon="sliders" />
                        <span v-if="store.filters > 0" class="filter-number">{{ store.filters }}</span>
                        <span class="d-none d-md-inline">Filtri</span>
                    </button>

                    <!-- Search Modal -->
                    <SearchModal />
                </div>

            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
@use '../assets/scss/vars' as *;

//__________________ NAVBAR

.bool-nav {
    padding: 0 12px;
    background-color: white;

    div[class*="col"] {
        padding: 0;
    }

    .row {
        height: 80px;
    }

    ul {
        @include flex(start);
        height: 100%;
        overflow-x: scroll;
        overflow-y: hidden;
        gap: 15px;
    }

    li {
        @include flex($direction: column);
        height: 100%;
        padding: 0 10px;
        font-size: 12px;
        border-bottom: 3px solid transparent;
        color: grey;
        font-weight: 500;
        transition: all 0.5s;
        cursor: pointer;
        gap: 5px;
        text-wrap: nowrap;

        img {
            filter: invert(40%) sepia(55%) saturate(0%) hue-rotate(206deg) brightness(113%) contrast(83%);
        }

        &:hover {
            border-bottom: 3px solid grey;
            color: black;

            img {
                filter: brightness(0) saturate(100%);
            }
        }
    }

    img {
        width: 25px;
    }


    .filter {
        @include flex;
        @include circle(40px);
        border: 1px solid $light-grey;
        position: relative;

        .filter-number {
            position: absolute;
            top: -10px;
            left: 90%;
            padding: 2px 7px 2px 7px;
            background-color: white;
            border-radius: 50%;
            border: 1px solid black;
        }
    }



    .has-filter {
        border: 2px solid black;
    }

    @media (min-width: 768px) {
        .filter {
            @include circle(auto);
            gap: 10px;
            border-radius: 10px;
            padding: 15px 12px;
        }
    }
}
</style>