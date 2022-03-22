<template>
    <div>
        <h1>Animal</h1>
        <p>Id: {{ animal.id }}</p>
        <p>Name: {{ animal.name }}</p>
        <router-link to="/">Animals</router-link>
    </div>
</template>

<script>
export default {
    name: 'Animal',
    data() {
        return {
            animal: {
                id: null,
                name: ''
            }
        }
    },
    methods: {
        async loadAnimals(id) {
            let response = await fetch(`http://127.0.0.1:8000/api/animals/${id}`)
            let data = await response.json()
            this.animal = data
        }
    },
    mounted() {
        this.loadAnimals(this.$route.params.id)
    }
}
</script>

<style>

</style>