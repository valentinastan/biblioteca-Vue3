<template>
  <div>
    <h1>{{ actionOnBook }}</h1>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model='formData.title'><br/>
      <input type="number" step="0.01" v-model='formData.price'><br/>
    
      <button type="submit">{{actionOnBook}}</button><br/>
    </form>
  </div>
</template>

<script>
export default {
  props: ['actionOnBook'],
  data() {
    return {
      formData: {
        title: null,
        price: null
      }
    }
  },
  methods: {
    handleSubmit() {
      if (this.actionOnBook === 'create') {
        this.createNewBook()
      } else if (this.actionOnBook === 'update') {
        this.updateBook()
      }
    },
    createNewBook() {

    },
    updateBook() {

    }
  }
}
</script>

<style>

</style>