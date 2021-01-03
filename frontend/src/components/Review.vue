<template>
  <div>
    {{reviewDetails.email}} <br/>
    {{reviewDetails.text}}
  </div>
</template>

<script>
export default {
  props: {
    reviewDetails: Object
  }

}
</script>

<style>

</style>