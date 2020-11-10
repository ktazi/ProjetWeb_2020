const Register = window.httpVueLoader('./components/Register.vue')
const Creation = window.httpVueLoader('./Components/Creation.vue')
const recettes = window.httpVueLoader('./Components/recettes.vue')
const Home = window.httpVueLoader('./Components/Home.vue')
const Inscription = window.httpVueLoader('./Components/Inscription.vue')
const Connexion = window.httpVueLoader('./Components/Connexion.vue')
const Acceuil = window.httpVueLoader('./Components/acc.vue')
const RecetteDis = window.httpVueLoader('./Components/Recette_display.vue')

const routes = [
    {path: '/', component: Acceuil},
    {path: '/acc', component:Acceuil},
    {path: '/recette-create/:rid', component:Creation},
    {path: '/all-recettes', component:recettes},
    {path: '/profile', component:Home},
    {path: '/recette-update', component:Creation},
    {path: '/SignUp', component:Inscription},
    {path: '/SignIn', component:Connexion},
    {path: '/register', component: Register},
    {path: '/test', component: RecetteDis}
]

const router = new VueRouter({
    routes
})

var app = new Vue({
    router,
    el: '#app',
    data:{
        users:[]
    },
    props: {
        users: {type: Array, default: []}
    },

    methods: {
        async connectUser(user) {
            const res = await axios.post('/api/SignIn', user)
            this.message = res.data.message
            this.user = res.data.user
        },
        async createUser (users) {
            const res = await axios.post('/api/SignUp', users)
            this.users.push(res.data)
        },
        async mounted(){
            const res = await axios.get('/api/SignUp')
            this.users = res.data
        }
    }
})