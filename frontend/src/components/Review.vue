<template>
  <div>
    <div v-if="reviews.length > 0">Reviews</div>
    <div v-for="review in reviews" :key="review.id">
      {{review.email}} <br />
      {{review.text}} <br />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Review',
  props: ['bookReviews', 'bookId'],
  computed: {
    reviews() {
        return this.$store.state.reviews
    }
  },
  mounted() {
    this.$store.dispatch('getReviews', this.bookId)
  },

}
</script>

<style>

</style>