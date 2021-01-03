<template>
  <div class="home">
    <CreateBookForm/>
    <Books />
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
    // fillForm(book) {
    //   console.log('cartea de editat', book)
    //   return this.$store.state.currentBook = book
    // }
  }
};
</script>
