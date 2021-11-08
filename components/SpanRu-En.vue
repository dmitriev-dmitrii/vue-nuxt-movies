
<template>

  <span v-if="language === 'ru'">
{{ru}}
  </span>
  <span v-else-if="language === 'en'">
{{en}}
  </span>

</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      language: "getLanguage",
    }),
  },
    props: {
      ru: {
      type: String,
      required: true,
    },

      en: {
      type: String,
      required: true,
    }
}
}
</script>