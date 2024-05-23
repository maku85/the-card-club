<template>
  <header
    class="border border-gray-200 border-t-0 border-l-0 border-r-0 border-b-1"
  >
    <section>
      <div class="h-2 flex flex-column">
        <div class="grow bg-blue-800"></div>
        <div class="grow bg-cyan-400"></div>
        <div class="grow bg-purple-800"></div>
        <div class="grow bg-yellow-400"></div>
        <div class="grow bg-red-600"></div>
        <div class="grow bg-blue-800"></div>
      </div>
    </section>

    <section class="content-middle">
      <div class="container mx-auto py-6">
        <NuxtLink to="/">
          <img
            loading="lazy"
            class="mx-auto"
            src="/logo.webp"
            alt="The Card Club"
          />
        </NuxtLink>
      </div>
    </section>
  </header>
</template>
