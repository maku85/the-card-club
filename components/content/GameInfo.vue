<script setup>
  defineProps({
    title: {
      type: String,
      required: false,
      default: () => '',
    },
    players: {
      type: String,
      required: false,
      default: () => '',
    },
    cards: {
      type: String,
      required: false,
      default: () => '',
    },
  });
</script>

<template>
  <h1 class="text-center block md:flex gap-4 pb-2 border-2 border-slate-300 border-l-0 border-r-0 border-t-0">
    {{ title }}
    <span class="flex justify-center">
      <span class="flex gap-1 items-center mr-3">
        <img src="/img/players-icon.svg" alt="Players icon" >
        <span>{{ players }}</span>
      </span>
      <span class="flex gap-1 items-center">
        <img src="/img/cards-icon.svg" alt="Cards icon" >
        <span>{{ cards }}</span>
      </span>
    </span>
  </h1>
</template>
