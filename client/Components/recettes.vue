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
        <p>If this is on the screen, then I've successfully linked the 2</p>

    </div>
</template>


<script>
module.exports = {
    prop:{
        recettes:{type:Array,default: []}
    },
    data:{

    }
}
</script>