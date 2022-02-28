<template>
  <div class="layout">
    <TheHeader />
    <main class="max-w-7xl p-2 m-auto h-full w-full">
      <nuxt />
    </main>
    <TheFooter />
  </div>
</template>

<script>

export default {

};
</script>


<style>

.layout{
  min-height: 100vh;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
}

</style>
