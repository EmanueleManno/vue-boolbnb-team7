<script>
import axios from 'axios';
const endpoint = 'http://127.0.0.1:8000/api/apartments'
export default {
    data: () => ({ apartments: [] }),
    methods: {
        fetchApartments() {
            axios.get(endpoint).then(res => { this.apartments = res.data })
        }
    },
    created() {
        this.fetchApartments();
    }
}
</script>

<template>
    <div class="container">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5">
            <div v-for="apartment in apartments" :key="apartment.id" class="col">
                <div class="card">
                    <a href="">
                        <div class="card-img">
                            <img :src="apartment.image" class="card-img-top" :alt="apartment.title">
                        </div>
                        <div class="card-body">
                            <h6 class="card-title">{{ apartment.title }}</h6>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use '../assets/scss/vars' as *;

.container {
    margin: 20px auto;
}

.card {
    border: none;
    border-radius: 0;
}

.card-img {
    border-radius: 15px;
    overflow: hidden;
}
</style>
