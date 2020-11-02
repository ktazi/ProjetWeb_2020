<template>
  <div>
    <div>
      <router-link :to="{ path : '/recette-create/'+ '-1' }">Creer nouvelle recette</router-link>
    </div>
    <div>
      <ul v-for="recette in recettes" class="list-unstyled">
        <li class="media">
          <img :src='recette.picture' class="mr-3" alt="image" width="50vw" height="50vw">
          <div class="media-body">
            <h5 class="mt-0 mb-1">{{recette.title}}</h5>
            <router-link :to="{ path : '/recette-create/'+ recette.rid }" tag="button">Editer</router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
module.exports = {
  data () {
    return {
      recettes : []
    };
  },
  async mounted (){
    this.recettes = await axios.get('/api/recettes')
    this.recettes = this.recettes.data
    console.log(this.recettes)
  }
}
</script>
<style>

</style>