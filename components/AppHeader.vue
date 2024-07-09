<template>
  <header>
    <section>
      <div class="h-5 flex flex-column">
        <div class="grow bg-blue-800" />
        <div class="grow bg-cyan-400" />
        <div class="grow bg-purple-800" />
        <div class="grow bg-yellow-400" />
        <div class="grow bg-red-600" />
        <div class="grow bg-blue-800" />
      </div>
    </section>

    <section
      class="container mx-auto py-6 px-12 max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl border border-gray-200 border-t-0 border-l-0 border-r-0 border-b-1"
    >
      <NuxtLink to="/">
        <img
          loading="lazy"
          class="mx-auto"
          src="/logo.webp"
          alt="The Card Club"
        />
      </NuxtLink>
    </section>
  </header>
</template>
