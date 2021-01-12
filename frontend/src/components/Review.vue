<template>
  <div class="row">
    <div v-if="reviews.length > 0" class="reviewTitle">Reviews</div>
    <div v-for="review in reviews" :key="review.id">
      <blockquote class="col-md-4 col-md-offset-4 review">
        <p>{{review.text}}</p>
        <footer class="pull-right">Wrote by <cite title="email">{{review.email}}</cite></footer>
      </blockquote>
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
    this.$store.dispatch('getReviews', { bookId: this.bookId })
  },

}
</script>

<style>

</style>