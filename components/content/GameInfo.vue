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
  <h1 class="flex gap-4">
    {{ title }}
    <span class="flex">
      <span class="flex gap-1 items-center mr-3">
        <img src="/img/players-icon.svg" alt="Players icon" />
        <span>{{ players }}</span>
      </span>
      <span class="flex gap-1 items-center">
        <img src="/img/cards-icon.svg" alt="Cards icon" />
        <span>{{ cards }}</span>
      </span>
    </span>
  </h1>
</template>
