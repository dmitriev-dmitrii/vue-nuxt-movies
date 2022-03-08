<template>
  <div>
    <main class="max-w-7xl m-auto p-2 sm:p-4">
      <h1
        v-if="error.statusCode === 404"
        class="
          font-bold
          text-3xl
          md:text-4xl
          lg:text-5xl
          font-heading
          xl:max-w-xs
          capitalize
          text-red
        "
      >
        Page not found
      </h1>

      <h1
        v-else
        class="
          font-bold
          text-3xl
          md:text-4xl
          lg:text-5xl
          font-heading
          xl:max-w-xs
          capitalize
          text-red
        "
      >
        {{error.message}} : {{error.statusCode}}
      </h1>

    </main>
  </div>
</template>

<script>
export default {
  props: ["error"],
};
</script>
