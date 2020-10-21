const Creation = window.httpVueLoader('./Components/Creation.vue')

const routes = [
    {path: '/recette-creation', component:Creation}
]

const router = new VueRouter({
    routes
})

var app = new Vue({
    router,
    el: '#app'

})