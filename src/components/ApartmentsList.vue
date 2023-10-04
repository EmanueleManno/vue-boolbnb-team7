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
                    <RouterLink :to="{ name: 'apartment', params: { id: apartment.id } }">
                        <div class="card-img">
                            <img :src="`http://127.0.0.1:8000/storage/${apartment.image}`" :alt="apartment.title">
                        </div>
                        <div class="card-content">
                            <h6 class="card-title">{{ apartment.title }}</h6>
                            <div><b>{{ apartment.price }}€</b> a notte</div>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/vars' as *;

.container {
    margin: 20px auto;
}

.card {
    border: none;
    border-radius: 0;
}

.card-img {
    @include square(calc(100vw - 24px), 15px);
    max-width: 100%;
    overflow: hidden;

    img {
        @include square(100%);
        object-fit: cover;
    }
}

.card-content {
    padding: 10px 0;
}

// Media Query
// Square images
@media (min-width: 576px) {
    .card-img {
        max-height: 514px;
    }
}

@media (min-width: 768px) {
    .card-img {
        max-height: 334px;
    }
}

@media (min-width: 992px) {
    .card-img {
        max-height: 293px;
    }
}

@media (min-width: 1200px) {
    .card-img {
        max-height: 259px;
    }
}

@media (min-width: 1400px) {
    .card-img {
        max-height: 238px;
    }
}
</style>
