<script>
import axios from 'axios';
const endpoint = 'http://localhost:8000/api/categories'
export default {
    data: () => ({ categories: [] }),
    methods: {
        fetchCategories() {
            axios.get(endpoint).then(res => { this.categories = res.data })
        }
    },
    created() {
        this.fetchCategories();
    }
}
</script>

<template>
    <nav class="bool-nav">
        <div class="container">
            <div class="row">
                <ul class="col col-11 col-md-10 col-lg-11">
                    <li v-for="category in categories" :key="category.id">
                        <img :src="`src/assets/img/category/${category.img}`" :alt="category.name">
                        <div>{{ category.name }}</div>
                    </li>
                </ul>
                <div class="d-none d-md-flex col col-md-2 col-lg-1 align-items-center justify-content-end">
                    <button class="filter"><!-- Filtri avanzati (DA FARE) -->
                        <font-awesome-icon icon="sliders" />
                        <span>Filtri</span>
                    </button>
                </div>
                <div class="col-1 d-flex d-md-none align-items-center justify-content-end">
                    <div class="filter"><font-awesome-icon icon="sliders" /></div> <!-- Filtri avanzati (DA FARE) -->
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