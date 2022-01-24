<template>
  <div class="layout">
    <TheHeader />
    <main >
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

  flex-direction: column;
  justify-content: space-between;
}

</style>
