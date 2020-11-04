const Register = window.httpVueLoader('./components/Register.vue')
const Creation = window.httpVueLoader('./Components/Creation.vue')
const recettes = window.httpVueLoader('./Components/recettes.vue')
const Home = window.httpVueLoader('./Components/Home.vue')
const Inscription = window.httpVueLoader('./Components/Inscription.vue')
const Connexion = window.httpVueLoader('./Components/Connexion.vue')

const routes = [
    {path: '/recette-create/:rid', component:Creation},
    {path: '/all-recettes', component:recettes},
    {path: '/profile', component:Home},
    {path: '/recette-update', component:Creation},
    {path: '/all-recettes', component:recettes},
    {path: '/Sign-up', component:Inscription},
    {path: '/Sign-in', component:Connexion},
    { path: '/register', component: Register}
]

const router = new VueRouter({
    routes
})

var app = new Vue({
    router,
    el: '#app',
    props: {
        users: {type: Array, default: []}
        },
    methods: { // fonction capable de se mouvoir
        async createUser (user) {
            const res = await axios.post('/api/signin', user)
        },
        async connectUser () {

        },
        async mounted(){
            const res = await axios.get('/api/signup')
            this.users = res.data
        }
    }
})