<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";

const route = useRoute();
const { slug } = route.params;
const { data } = await useAsyncData("game", async () => {
  const game = queryContent("games")
    .where({ _path: `/games/${slug}` })
    .findOne();

  const surround = queryContent()
    .only(["_path", "title"])
    .sort({ date: 1 })
    .findSurround(`/games/${slug}`);
  return {
    game: await game,
    surround: await surround,
  };
});
const game = data?.value?.game;
const [prev, next] = data?.value?.surround || [];

const variationsQuery: QueryBuilderParams = {
  path: "/games",
  where: [
    {
      _path: {
        $in: (game?.variations || []).map((v: string) => `/games/${v}`),
      },
    },
  ],
  only: ["title", "image", "_path", "excerpt"],
};
</script>

<template>
  <div class="container-fluid mx-auto">
    <section class="container-fluid">
      <div
        style="
          background-image: url(https://images.unsplash.com/photo-1501003878151-d3cb87799705?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
        "
        class="bg-hero bg-cover bg-center bg-no-repeat relative text-white"
      >
        <div
          class="bg-gradient-to-r from-transparent via-grey-500 to-slate-900 w-full absolute bottom-0 top-0 bg-opacity-35"
        ></div>
        <div class="container mx-auto">
          <h1 class="relative py-4 sm:py-10">{{ game?.title }}</h1>
        </div>
      </div>
    </section>

    <section class="container mx-auto mt-10 mb-10">
      <div class="flex flex-wrap sm:flex-nowrap">
        <div class="bg-gray-200 py-8 px-10">
          <ContentRendererMarkdown :value="game || {}" />
        </div>
        <div
          class="bg-yellow-400 py-8 px-8 text-nowrap w-full order-first sm:order-last"
        >
          <ul>
            <li>
              <span class="font-bold uppercase">Players:</span>
              <span class="ml-2">{{ game?.players || "n.d." }}</span>
            </li>
            <li>
              <span class="font-bold uppercase">Cards:</span>
              <span class="ml-2">{{ game?.cards || "n.d." }}</span>
            </li>
          </ul>
        </div>
      </div>

      <ContentList :query="variationsQuery">
        <template #not-found> </template>

        <template #default="{ list }">
          <div class="py-5">
            <div class="py-2">
              <h2>Varianti</h2>
            </div>
            <div v-for="variation in list" :key="variation._path">
              <h5>
                <button
                  type="button"
                  class="flex items-center justify-between w-full py-5 font-medium text-500 border-b border-gray-200 gap-3"
                >
                  <span>{{ variation.title }}</span>
                </button>
              </h5>
              <div class="py-5 border-b border-gray-200">
                <p class="mb-2 text-500">
                  <ContentRendererMarkdown :value="variation.excerpt || {}" />
                </p>
              </div>
            </div>
          </div>
        </template>
      </ContentList>
    </section>

    <section
      class="container mx-auto mb-10 pt-10 border border-gray-200 border-t-2 border-l-0 border-r-0 border-b-0"
    >
      <PrevNext :prev="prev" :next="next" />
    </section>
  </div>
</template>
