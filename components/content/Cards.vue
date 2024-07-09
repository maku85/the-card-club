<script setup>
  defineProps({
    cards: {
      type: String,
      required: false,
      default: () => 'ace,2,3,4,5,6,7,8,9,10,jack,queen,king',
    },
  });
</script>

<template>
  <div class="flex">
    <span v-for="card in cards.split(',')" :key="card">
      <img :src="`/img/cards/${card}.svg`" alt="card" />
    </span>
  </div>
</template>
