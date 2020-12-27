<template>
  <div>
    <h1>My books</h1>
    <ul>
      <li v-for="book in books" :key="book.title">
        {{ book.title }} , {{ book.price}} , {{ book.reviews }}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  computed: {
    books() {
      return this.$store.state.books
    }
  },
  mounted() {
    this.$store.dispatch('getBooks')
  }
}
</script>

<style>

</style>