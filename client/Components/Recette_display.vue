<template>
  <div>
  <div class="jumbotron mb-0" :style="{ backgroundImage: 'url(' + recipe.picture + ')', backgroundSize: 'cover' }">
      <div class="row justify-content-center">
        <h1 class="mr-5 display-3" id="titree">{{recipe.title}}</h1>
      </div>
  </div>
  <div class="row justify-content-center pt-2 text-light pt-3 pb-3" style="background:linear-gradient(90deg, rgba(66,72,116,1) 0%, rgba(166,177,225,1) 79%, rgba(220,214,247,1) 100%) ">
    <h2>Tags : </h2>
      <ul class="" v-for="tag in recipe.tag" style="list-style: none">
        <li class="">{{tag}}</li>
      </ul>
  </div>
  <div class="row">
    <div class="col-3 text-center border-right pt-5 pb-5 bg-dark text-light" >
      <div class="mb-5">
        <h3 class="mb-5">Ingrédients</h3>
          <ul class="list-group list-group-flush " v-for="ing in recipe.ing">
            <li class="mb list-group-item bg-dark" >
              <p class="lead">{{ing}}</p>
            </li>
          </ul>
      </div>
      <div class="text-light">
        <h3 class="mb-5" >Materiel</h3>
          <ul class="list-group list-group-flush" v-for="mat in recipe.mat">
            <li class="mb list-group-item bg-dark">
              <p class="lead">{{mat}}</p>
            </li>
          </ul>
        </div>
    </div>
    <div class="col-9  border-right pt-5 pb-5 pl-5 pr-5 text-dark bg-light" style="background-color: #424874">
      <h1 class="mb-5">Étapes : </h1>
        <ul v-for="step in recipe.steps">
          <li>
            <p class="font-weight-light mb-5">{{step}}</p>
          </li>
        </ul>
    </div>
  </div>
    <div class="border-bottom text-light text-center pb-2 pt-2" style="background-color: #424874">
      <h3>Commentaires des utilisateurs</h3>
    </div>
    <div class="mb-5">
      <div class="text-center mb-2 mt-2">
        <h5>Ajouter un commentaire</h5>
        <div class="input-group w-75 mr-auto ml-auto">
          <textarea class="form-control" placeholder="Ecrivez vos impressions" rows="4" v-model="comment"></textarea>
          <button class="input-group-append btn-secondary text-center align-items-center"@click="post"><p>Poster</p></button>
        </div>
      </div>
    </div>
    <div v-if="com.length === 0" class="text-center">
      <p>
        Pas de commentaires pour l'instant
      </p>
    </div>
    <div v-else>
      <h5 class="text-center">Commentaires</h5>
      <ul v-for="comment in com" class="pl-0">
        <li class="list-group-item w-75 mr-auto ml-auto">
          <div class="row">
            <div class="col-xs-10 col-md-11">
              <div>
                <div class="pb-4 border-bottom mb-2 w-25">
                  <h5>{{comment.usernam}}</h5>
                  <small>Le: {{comment.dat}}</small>
                </div>
              </div>
              <div class="comment-text">
                <p>
                  {{comment.cont}}
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
module.exports = {
  data: function () {
    return {
      recipe : {
        title : "Sans Titre",
        picture : "https://www.wallpaperflare.com/static/363/962/392/minimalism-low-poly-white-gray-wallpaper.jpg",
        mat : ["Listez le matériel ici"],
        ing : ["Listez vos ingredients ici"],
        tag : ["#vos tags ici"],
        steps : ["Listez les étapes de la recette ici."],
        rid : 0
      },
      com : [],
      comment : ''
    }
  },
  mounted : async function(){
    this.rid = this.getparams()
    this.recipe.rid = this.rid;
    await this.getrecette();
    let a = await axios.post('/api/comments', {rid : this.rid})
    this.com = a.data
  },
  methods :{
    async post(){
      let com = {
        cont : this.comment,
        rid : this.rid,
        dat : new Date().toDateString()
      }
      await axios.post('/api/com', com)
      location.reload()
    },
    getparams(){
      return this.$route.params.rid;
    },
    async getrecette(){
      let recette = await axios.get('/api/recettes');
      recette = recette.data;
      if (this.$route.params.rid.toString() !== '-1')
      {
        for (let i = 0; i < recette.length; i++){
          if (recette[i].rid.toString() === this.$route.params.rid.toString())
          {
            this.recipe = recette[i];
          }
        }
      }
    }
  }
}
</script>
<style>
</style>