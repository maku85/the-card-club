<script setup>
  import { onMounted } from 'vue';

  const showBackToTop = () => {
    const backTop = document.getElementById('back-top');
    const backTopClasses = backTop.classList;
    if (document.documentElement.scrollTop >= 400) {
      if (backTopClasses.contains('hidden')) {
        backTopClasses.remove('hidden');
      }
    } else if (!backTopClasses.contains('hidden')) {
      backTopClasses.add('hidden');
    }
  };
  function backToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onMounted(() => {
    showBackToTop();
    window.onscroll = () => {
      showBackToTop();
    };
  });
</script>

<template>
  <div id="back-top" class="hidden fixed bottom-0 right-0 p-6 flex flex-col">
    <button
      class="bg-slate-50 w-10 h-10 rounded-full hover:animate-bounce shadow"
      @click="backToTop()"
    >
      <svg
        class="fill-red-600 mx-auto"
        baseProfile="full"
        fill="none"
        width="32"
        height="32"
        viewBox="68.547241 122.68109 537.42297 635.16461"
      >
        <path
          d="m213.23 502.9c-195.31 199.54-5.3525 344.87 149.07 249.6.84137 49.146-37.692 95.028-61.394 138.9h166.73c-24.41-42.64-65.17-89.61-66.66-138.9 157.66 90.57 325.33-67.37 150.39-249.6-91.22-100.08-148.24-177.95-169.73-204.42-19.602 25.809-71.82 101.7-168.41 204.42z"
          fill-rule="evenodd"
          stroke="#000"
          stroke-width="1.3691pt"
          transform="translate(-40.697 -154.41)"
        />
      </svg>
    </button>
    <span class="text-red-600 text-xs">torna su</span>
  </div>
</template>
