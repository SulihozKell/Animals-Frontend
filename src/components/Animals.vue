<template>
  <table border="1px">
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Operations</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="animal in animals" v-bind:key="animal.id">
        <td>{{ animal.id }}</td>
        <td>{{ animal.name }}</td>
        <td>
          <button @click="editAnimal(animal.id)">Edit</button>
          <button @click="deleteAnimal(animal.id)">Delete</button>
        </td>
      </tr>
      <tr>
        <td>
          <input type="hidden" v-model="animal.id">
        </td>
        <td>
          <input type="text" v-model="animal.name">
        </td>
        <td>
          <button v-if="is_new_animal" @click="newAnimal" :disabled="disableButton">New</button>
          <button v-if="!is_new_animal" @click="saveAnimal" :disabled="disableButton">Save</button>
          <button v-if="!is_new_animal" @click="resetForm" :disabled="disableButton">Cancel</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Animals',
  data() {
    return {
      animal: {
        id: null,
        name: ''
      },
      animals: [],
      is_new_animal: true,
      disableButton: false
    }
  },
  methods: {
    async loadAnimals() {
      let response = await fetch('http://127.0.0.1:8000/api/animals')
      let data = await response.json()
      this.animals = data
    },
    async deleteAnimal(id) {
      await fetch(`http://127.0.0.1:8000/api/animals/${id}`, {
        method: 'DELETE'
      })
      await this.loadAnimals()
    },
    async newAnimal() {
      this.disableButton = 'disabled'
      await fetch('http://127.0.0.1:8000/api/animals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(this.animal)
      })
      await this.loadAnimals()
      this.disableButton = false
      this.resetForm()
    },
    async saveAnimal() {
      this.disableButton = 'disabled'
      await fetch(`http://127.0.0.1:8000/api/animals/${this.animal.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(this.animal) 
      })
      await this.loadAnimals()
      this.disableButton = false
      this.resetForm()
    },
    async editAnimal(id) {
      let response = await fetch(`http://127.0.0.1:8000/api/animals/${id}`)
      let data = await response.json()
      this.animal = {...data};
      this.is_new_animal = false
    },
    resetForm() {
      this.animal = {
        id: null,
        name: ''
      }
      this.is_new_animal = true
    }
  },
  mounted() {
    this.loadAnimals()
  }
}
</script>

<style>
button {
  width: 4.5em;
}
</style>
