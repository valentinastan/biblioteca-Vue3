<template>
  <div>
    <h2>Book details</h2>
    <h3>
      {{id}}
      {{currentBook.id}}
      {{currentBook.title}} <br/>
      Price: {{currentBook.price}}
    </h3>
    <Review :bookReviews = 'reviewsOfCurrentBook' :bookId = 'id'/>
    <CreateReview v-if="this.$store.getters.getAuthToken" :bookId = 'id'/>
    <!-- <div v-if="this.$store.state.books[id].reviews.length > 0">Reviews: 
      <review v-for="review in this.$store.state.books[id].reviews" :key="review.id" :reviewDetails='review'>
      </review>
    </div> -->
  </div>
</template>

<script>
import Review from './Review.vue';
import CreateReview from './CreateReview'


export default {
  name: 'BookDetails',
  props: ['id'],
  components: {
    Review,
    CreateReview
  },
  computed: {
    currentBook() {
      return this.$store.state.bookWithDetails
    },
    reviewsOfCurrentBook() {
      return this.$store.state.bookWithDetails.reviews
    },
  },
  mounted() {
    console.log('am intrat in mounted', this.$store.state.bookWithDetails , "si id: ", this.id)
    this.$store.dispatch('getOneBook', this.id)
  },
  methods() {
  }


}
</script>

<style>

</style>