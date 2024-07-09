<script setup>
  const props = defineProps(['filters', 'refreshFn']);

  const { filters } = toRefs(props);

  function refresh() {
    props.refreshFn();
  }
</script>

<template>
  <section
    className="container mx-auto px-12 max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl border border-gray-200 border-t-0 border-l-0 border-r-0 border-b-1"
  >
    <form class="py-8">
      <div class="flex flex-row gap-4 justify-center">
        <span
          class="flex gap-1 relative text-gray-400 focus-within:text-gray-600 block"
        >
          <img
            class="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 right-4"
            src="/img/players-icon.svg"
            alt="Players icon"
          />
          <select
            id="playersSelect"
            v-model="filters.nOfPlayers"
            className="h-10 border-2 border-gray-500 focus:outline-none focus:border-gray-500 text-gray-500 rounded pl-2 pr-8 md:pl-3 py-0 md:py-1 tracking-wider"
            @change="refresh()"
          >
            <option value="">Qualsiasi</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </span>
        <span
          class="flex gap-1 relative text-gray-400 focus-within:text-gray-600 block"
        >
          <img
            class="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 right-5"
            src="/img/cards-icon.svg"
            alt="Cards icon"
          />
          <select
            id="cardsSelect"
            v-model="filters.nOfCards"
            className="h-10 border-2 border-gray-500 focus:outline-none focus:border-gray-500 text-gray-500 rounded pl-2 pr-10 md:pl-3 py-0 md:py-1 tracking-wider"
            @change="refresh()"
          >
            <option value="">Qualsiasi</option>
            <option value="40">40</option>
            <option value="52">52</option>
          </select>
        </span>
        <span
          class="flex gap-1 relative text-gray-400 focus-within:text-gray-600 block"
        >
          <img
            class="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 right-5"
            src="/img/team-icon.svg"
            alt="Cards icon"
          />
          <select
            id="teamSelect"
            v-model="filters.teams"
            className="h-10 border-2 border-gray-500 focus:outline-none focus:border-gray-500 text-gray-500 rounded pl-2 pr-8 md:pl-3 py-0 md:py-1 tracking-wider"
            @change="refresh()"
          >
            <option value="">Qualsiasi</option>
            <option value="true">A squadre</option>
            <option value="false">Singolo</option>
          </select>
        </span>
      </div>
    </form>
  </section>
</template>
