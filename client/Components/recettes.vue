<template>
    <div>
        <p>If this is on the screen, then I've successfully linked the 2</p>
        <div v-for="recette in recettes" :key="recette.rid">
            <div class="recetteName">
                {{recette.title}} something
            </div>
            <div class="recetteImage">
                    something
            </div>
            <div class="recettesCorps">
                    something
            </div>

        </div>
        <button @click="title_sort()" >
                test
            </button>
        <p>If this is on the screen, then I've successfully linked the 2</p>
    </div>
</template>


<script>

    /*function swap(a,b){
        temp = a;
        a = b;
        b = temp;
       }*/
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
           var i,j,k;
           var tab = [];
           var nb = this.recettes.length;
           for(var k =0; k < nb ; k++){
               tab[k] = this.recettes[k]
           }
           for(var i = 0; i < nb; i++){
               for(j = nb - 1; j > i; j--){
                   if(tab[j-1].title.charCodeAt(0) > tab[j].title.charCodeAt(0) ){
                       var temp = tab[j-1];
                       tab[j-1] = tab[j] ;
                       tab[j] = temp
                   }
               }
           }
           console.log(tab)
       }
       //tri par notes décroissantes
   }
}
function swap(a,b){
        temp = a;
        a = b;
        b = temp;
       }
</script>