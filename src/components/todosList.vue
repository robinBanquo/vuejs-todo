<template>
    <div>
        <todos v-model="todos"></todos>
        <hr>
        <todos v-model="todos"></todos>
        <hr>
        <todos></todos>
        <hr>
        <button @click="addTodo">Ajouter une tache</button>
    </div>
</template>
<script>
import Todos from './Todos'
export default {
  data () {
    return {
      todos: [{
        name: 'Demo',
        completed: true
      }]
    }
  },
  methods: {
    addTodo () {
      this.todos.push({
        name: 'Jean',
        completed: false
      })
    }
  },
  components: {
    Todos
  }
}
</script>