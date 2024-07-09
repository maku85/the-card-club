<script setup>
  defineProps({
    title: {
      type: String,
      required: false,
      default: () => '',
    },
    color: {
      type: String,
      required: false,
      default: () => 'red-500',
    },
    position: {
      type: String,
      required: false,
      default: () => 'start',
    },
  });
</script>

<template>
  <section class="container mx-auto mt-10 mb-10">
    <div v-if="title" class="flex" :class="['justify-' + position]">
      <span :class="['bg-' + color]" class="py-1.5 px-8 text-white font-bold">
        {{ title }}
      </span>
    </div>
    <div class="bg-gray-200 py-8 px-10"><slot /></div>
  </section>
</template>
