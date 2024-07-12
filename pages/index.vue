<script setup lang="ts">
  const filters = reactive({
    nOfPlayers: '',
    nOfCards: '',
    teams: '',
  });

  const { data, refresh } = await useAsyncData('game', () => {
    const whereConditions = {};
    if (filters.nOfPlayers) {
      Object.assign(whereConditions, {
        minPlayers: { $lte: Number.parseInt(filters.nOfPlayers) },
        maxPlayers: { $gte: Number.parseInt(filters.nOfPlayers) },
      });
    }
    if (filters.nOfCards) {
      Object.assign(whereConditions, { cards: { $eq: filters.nOfCards } });
    }
    if (filters.teams !== '') {
      Object.assign(whereConditions, {
        teams: filters.teams === 'true' ? { $eq: true } : { $ne: true },
      });
    }
    return queryContent('games').where(whereConditions).find();
  });

  function calculateColor(index: number) {
    if (index % 4 === 0) {
      return 'bg-yellow-400 text-slate-700 fill-slate-700';
    }
    if (index % 3 === 0) {
      return 'bg-red-600 text-slate-50 fill-slate-50';
    }
    if (index % 2 === 0) {
      return 'bg-blue-800 text-slate-50 fill-slate-50';
    }
    return 'bg-cyan-400 text-slate-700 fill-slate-700';
  }
</script>

<template>
  <div class="container mx-auto py-4">
    <AppFilters :filters="filters" :refresh-fn="refresh" />

    <div class="flex flex-wrap py-2 justify-center">
      <div
        v-for="(game, index) in data"
        :key="game._path"
        class="w-1/2 md:w-auto"
        :class="[data && data.length > 1 ? 'grow' : '']"
      >
        <div class="mx-2 my-2">
          <NuxtLink :to="game._path">
            <GameCard :game="game" :color-class="calculateColor(index)" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
