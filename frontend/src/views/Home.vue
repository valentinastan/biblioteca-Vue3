<template>
  <div class="home">
    <create-book-form />
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
    fillForm(book) {
      return this.newBook = {...book}
    }
  }
};
</script>
