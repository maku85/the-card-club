<script setup>
defineProps({
  prev: {
    type: Object,
    required: false,
    default: () => {},
  },
  next: {
    type: Object,
    required: false,
    default: () => {},
  },
});
</script>

<template>
  <section class="flex flex-row">
    <div v-if="prev?.title">
      <NuxtLink :to="prev?._path">
        <h5 class="item__title">{{ "< " + prev?.title }}</h5>
      </NuxtLink>
    </div>
    <div class="grow"></div>
    <div v-if="next?.title">
      <NuxtLink :to="next._path">
        <h5 class="item__title">{{ next.title + " >"}} </h5>
      </NuxtLink>
    </div>
  </section>
</template>
