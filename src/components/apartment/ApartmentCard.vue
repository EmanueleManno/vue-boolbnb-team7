<script>
export default {
    props: {
        apartment: Object
    }
};
</script>

<template>
    <div class="card">
        <RouterLink :to="{ name: 'apartment', params: { id: apartment.id } }">
            <div class="card-img">
                <img v-if="apartment.image" :src="`http://127.0.0.1:8000/storage/${apartment.image}`"
                    :alt="apartment.title">
                <img src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                    alt="placeholder">
            </div>
            <div class="card-content">
                <h6 class="card-title">{{ apartment.title }}</h6>
                <div><b>{{ apartment.price }}€</b> a notte</div>
            </div>
        </RouterLink>
    </div>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/vars' as *;

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