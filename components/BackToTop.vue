<script setup>
import { onMounted } from "vue";

const showBackToTop = () => {
  const backTop = document.getElementById("back-top");
  const backTopClasses = backTop.classList;
  if (document.documentElement.scrollTop >= 400) {
    if (backTopClasses.contains("hidden")) {
      backTopClasses.remove("hidden");
    }
  } else if (!backTopClasses.contains("hidden")) {
    backTopClasses.add("hidden");
  }
};
function backToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

onMounted(() => {
  showBackToTop();
  window.onscroll = () => {
    showBackToTop();
  };
});
</script>

<template>
  <div id="back-top" class="hidden fixed bottom-0 right-0 p-6">
    <button
      class="bg-red-600 text-slate-50 rounded-full w-10 h-10 flex items-center justify-center"
      @click="backToTop()"
    >
      <svg class="h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        ></path>
      </svg>
    </button>
  </div>
</template>
