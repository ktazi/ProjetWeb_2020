const Creation = window.httpVueLoader('./Components/Creation.vue')
const recettes = window.httpVueLoader('./Components/recettes.vue')

const routes = [
    {path: '/recette-update', component:Creation}
]

const router = new VueRouter({
    routes
})

var app = new Vue({
    router,
    el: '#app'

})