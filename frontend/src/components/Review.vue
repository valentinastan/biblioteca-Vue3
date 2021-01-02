<template>
  <div>
    {{reviewDetails.username}} <br/>
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