<template>
  <div class="currentBook">
    <div class="bookData">
    <p>{{currentBook.title}}</p>
    <p>Price: {{currentBook.price}} RON</p>
    </div>
    <CreateReview v-if="this.$store.getters.getAuthToken" :bookId = 'id'/>
    <button v-if="this.$store.state.reviews.length !== 0"  @click="getReviews('previous')" class="buttonPage">Previous</button>
    <button v-if="this.$store.state.reviews.length === 10"  @click="getReviews('next')" class="buttonPage">Next</button>
    <Review :bookReviews = 'reviewsOfCurrentBook' :bookId = 'id'/>
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
    this.$store.dispatch('getOneBook', this.id)
  },
  methods: {
    lastReviewId() {
      const reviews =  this.$store.state.reviews
      return reviews[reviews.length -1].id
    },
    firstReviewId() {
      const reviews =  this.$store.state.reviews
      return reviews[0].id
    },
    getReviews(direction) {
      let reviewId
      if(direction === 'previous') {
        reviewId = this.firstReviewId()
      }
      if(direction === 'next') {
        reviewId = this.lastReviewId()
      }
      this.$store.dispatch('getReviews', {
        bookId: this.id, 
        queryParams: { 
          reviewId,
          direction
        }
      })
    }
  }
}
</script>

<style>

</style>