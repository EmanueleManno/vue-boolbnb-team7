<script>
export default {
    props: {
        apartment: Object
    }
};
</script>

<template>
    <div class="card">
        <a href="#">
            <div class="card-img">
                <img :src="apartment.image" :alt="apartment.title">
            </div>
            <div class="card-content">
                <h6 class="card-title">{{ apartment.title }}</h6>
                <div><b>{{ apartment.price }}€</b> a notte</div>
            </div>
        </a>
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