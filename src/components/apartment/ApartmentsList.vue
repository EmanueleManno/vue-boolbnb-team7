<script>
import ApartmentCard from './ApartmentCard.vue';


export default {
    props: {
        apartments: Array
    },
    components: { ApartmentCard }
}
</script>

<template>
    <div class="container">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5">
            <div v-for="apartment in apartments" :key="apartment.id" class="col">
                <!--Card-->
                <ApartmentCard :apartment="apartment" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/vars' as *;

.container {
    margin: 20px auto;
}
</style>
