const Creation = window.httpVueLoader('./Components/Creation.vue')
const recettes = window.httpVueLoader('./Components/recettes.vue')
const Home = window.httpVueLoader('./Components/Home.vue')
const SignIn = window.httpVueLoader('./Components/SignIn.vue')
const SignUp = window.httpVueLoader('./Components/SignUp.vue')

const routes = [
    {path: '/recette-create/:rid', component:Creation},
    {path: '/all-recettes', component:recettes},
    {path: '/profile', component:Home},
    {path: '/recette-update', component:Creation},
    {path: '/all-recettes', component:recettes},
    {path: '/Sign-in', component:SignIn},
    {path: '/Sign-up', component:SignUp}
]

const router = new VueRouter({
    routes
})

var app = new Vue({
    router,
    el: '#app',
    data:{
        recttes: []
    },
    methods: {
        async createUser () {
            const res = await axios.get('/api/signup')
        },
        async connectUser () {
            const res = await axios.post('/api/signin')
        },
        async getRecettes(){
            const res = await axios.get('api/recettes')
            this.recettes = res.data
        }
    }

})