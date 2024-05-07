<script setup>
const props = defineProps(["filters", "refreshFn"]);

const { filters } = toRefs(props);

function refresh() {
  props.refreshFn();
}
</script>

<template>
  <section>
    <form class="bg-gray-200 py-4 px-6">
      <div class="flex flex-row gap-4">
        <select
          id="playersSelect"
          v-model="filters.nOfPlayers"
          class="w-full h-10 border-2 border-gray-500 focus:outline-none focus:border-gray-500 text-gray-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
          @change="refresh()"
        >
          <option value="">Numero di giocatori</option>
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
        <select
          id="cardsSelect"
          v-model="filters.nOfCards"
          class="w-full h-10 border-2 border-gray-500 focus:outline-none focus:border-gray-500 text-gray-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
          @change="refresh()"
        >
          <option value="">Numero di carte</option>
          <option value="40">40</option>
          <option value="52">52</option>
        </select>
        <select
          id="cardsSelect"
          v-model="filters.teams"
          class="w-full h-10 border-2 border-gray-500 focus:outline-none focus:border-gray-500 text-gray-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
          @change="refresh()"
        >
          <option value="">Tipologia di gioco</option>
          <option value="true">A squadre</option>
          <option value="false">Singolo</option>
        </select>
      </div>
    </form>
  </section>
</template>
