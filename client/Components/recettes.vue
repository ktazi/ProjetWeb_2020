<template>

    <div class="text-center">
      <h1 class="display-4  mt-3 mb-5">Recettes populaires</h1>
      <div id="allrecettes" class="pl-5 pr-5">
        <ul v-for="recette in recettes" class="list-group-item" id="liste">
          <li class="media list-group-item-light flex-xl-row flex-lg-row flex-md-row flex-sm-column">
            <img :src='recette.picture' alt="image" width="200vw" height="200vw">
            <div class="media-body">
              <h5 class="mt-0 mb-1">{{recette.title}}</h5>
              <br>
              <div class="row ml-2">
                <div v-for="tag in recette.tag">
                  <p class="mr-1">{{tag}}</p>
                </div>
              </div>
            </div>
            <div class="flex-column">
              <stars :note="recette.note"></stars>
              <button class="btn btn-outline-secondary" @click="">Consulter la recette</button>
              <button class="btn btn-outline-secondary" @click="">Noter</button>
            </div>
          </li>
        </ul>
      </div>

      <button @click="title_sort()" >
        test
      </button>
    </div>
</template>


<script>
Vue.component('stars', {
  props : ['note'],
  mounted(){
    if(this.note !== undefined){
      for(let i = 1; i <= 5; i++)
      {
        this.stars.push(this.note >= i);
      }
    }
  },
  data: function () {
    return {
      stars : []
    }
  },
  template: `<div >
  <p>Moyenne : {{this.note}} </p>
  <div class="row" style="margin-left: auto; margin-right: auto">
    <div v-for="star in stars">
      <div v-if="star">
        <p class="fa fa-star " style="color:orange"></p>
      </div>
      <div v-else>
        <p class="fa fa-star"></p>
      </div>
    </div>
  </div>

  </div>`
})
    module.exports = {
    data(){
        return {
            recettes:[]
        }
    },
    async mounted(){
        const res = await axios.get('/api/recettes')
        this.recettes = res.data
        console.log(this.recettes)
        console.log(this.recettes.length)
        console.log(this.recettes[0].title[0])
        console.log("A".charCodeAt(0))
        
    },
    methods:{
        //tri ordre alphabetique de titres
        title_sort(){
            var i,j;
            var nb = this.recettes.length;
            for(var i = 0; i < nb; i++){
                for(j = nb - 1; j > i; j--){
                    if(this.recettes[j-1].title.charCodeAt(0) > this.recettes[j].title.charCodeAt(0) ){
                        var temp = this.recettes[j-1];
                        this.recettes[j-1] = this.recettes[j] ;
                        this.recettes[j] = temp
                    }
                }
            }
            console.log(this.recettes)
        }
        //tri par notes décroissantes
    }
    }
    </script>

<style>
    #allrecettes{
      margin-left: auto;
      margin-right: auto;
    }
</style>
 
