<template>

    <div>
        <p>If this is on the screen, then I've successfully linked the 2</p>
        <div v-for="recette in recettes" :key="recette.rid">
            <div class="recetteName">
                {{recette.title}} 
                
            </div>
            <div class="recetteImage" > 
                  <div :style=" { backgroundImage: 'url(' + recette.picture + ')' }  ">  </div>  lll
            </div>
            <div class="recettesCorps">
                   {{recette.note}}
                   {{recette.steps}}
            </div>

        </div>
        <button @click="title_sort()" >
                test
            </button>
        <p>If this is on the screen, then I've successfully linked the 2</p>
    </div>
</template>


<script>
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
    .recetteImage {
        height: 30%;
        height: 20px;
        width: 20px;
        flex-direction: column;
        margin-bottom: 5px;
        border-bottom : #aaaaaa 1px solid;
    }
</style>
 
