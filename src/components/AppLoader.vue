
<script>
export default {
  props: {
    isLoading: Boolean, 
  },
};
</script>



<template>
  <div class="loader" v-if="isLoading">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Caricamento...</span>
    </div>
  </div>
</template>
  
  
  
<style scoped>
  .loader {
    
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 24px;
  }

</style>