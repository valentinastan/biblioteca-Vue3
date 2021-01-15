<template>
  <div class="container-fluid homePage">
    <CreateBookForm v-if="this.$store.getters.getAuthToken"/>
    <Books/>
  </div>
</template>

<script>
// @ is an alias to /src
import Books from "@/components/Books.vue"
import CreateBookForm from '../components/CreateBookForm.vue';

export default {
  name: "Home",
  components: {
    Books,
    CreateBookForm
  },
  methods: {
  }
};
</script>
