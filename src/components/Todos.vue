<template>
    <section class="todoapp">
        <header class="header">
            <h1>Todos</h1>
            <input type="text" class="new-todo" placeholder="Ajouter une tache" v-model="newTodo" @keyup.enter="addTodo">
        </header>
        <div class="main">
            <input type="checkbox" class="toggle-all" v-model="allDone">
            <ul class="todo-list">
                <li class="todo" v-for="todo in filteredTodos" :class="{completed: todo.completed, editing: todo === editing}">
                    <div class="view">
                        <input type="checkbox" v-model="todo.completed" class="toggle">
                        <label @dblclick="editTodo(todo)">{{ todo.name }}</label>
                        <button class="destroy" @click.prevent="deleteTodo(todo)"></button>
                    </div>
                    <input type="text" class="edit" v-model="todo.name" @keyup.enter="doneEdit" @blur="doneEdit" @keyup.esc="cancelEdit" v-focus="todo === editing">
                </li>
            </ul>
        </div>
        <footer class="footer" v-show="hasTodos">
            <span class="todo-count">
                <strong>{{remain}}</strong> taches à faire
            </span>
            <ul class="filters">
                <li><a href="#" :class="{selected: filter === 'all'}" @click.prevent="filter = 'all'">toutes</a></li>
                <li><a href="#" :class="{selected: filter === 'todo'}" @click.prevent="filter = 'todo'">A faire</a></li>
                <li><a href="#" :class="{selected: filter === 'done'}" @click.prevent="filter = 'done'">Faites</a></li>
            </ul>
            <button class="clear-completed" v-show="hasOneCompleted" @click="deleteCompleted">clear done</button>
        </footer>
    </section>
</template>

<script>
  import Vue from 'vue'
  export default {
    props: {
      value: {type: Array, default () { return [] }}
    },
    data () {
      return {
        todos: this.value,
        newTodo: '',
        filter: 'all',
        editing: null,
        oldTodo: ''
      }
    },
    watch: {
      value (value) {
        this.todo = value
      }
    },
    methods: {
      addTodo () {
        this.todos.push({
          name: this.newTodo,
          completed: false
        })
        this.newTodo = ''
      },
      deleteTodo (todo) {
        this.todos = this.todos.filter(i => i !== todo)
        this.$emit('input', this.todos)
      },
      deleteCompleted () {
        this.todos = this.todos.filter(i => !i.completed)
        this.$emit('input', this.todos)
      },
      editTodo (todo) {
        this.oldTodo = todo.name
        this.editing = todo
      },
      doneEdit () {
        this.editing = null
      },
      cancelEdit () {
        this.editing.name = this.oldTodo
        this.doneEdit()
      }
    },
    computed: {
      remain () {
        return this.todos.filter(todo => !todo.completed).length
      },
      filteredTodos () {
        if (this.filter === 'done') {
          return this.todos.filter(todo => todo.completed)
        } else if (this.filter === 'todo') {
          return this.todos.filter(todo => !todo.completed)
        } else {
          return this.todos
        }
      },
      allDone: {
        get () {
          return this.remain === 0
        },
        set (value) {
          this.todos.forEach(todo => {
            todo.completed = value
          })
        }
      },
      hasTodos () {
        return this.todos.length > 0
      },
      hasOneCompleted () {
        var x = false
        this.todos.forEach(todo => {
          if (todo.completed) {
            x = true
          }
        })
        return x
      }
    },
    directives: {
      focus (el, value) {
        if (value) {
          Vue.nextTick(_ =>
            el.focus()
          )
        }
      }
    }
  }
</script>
<style src="./todos.css"></style>
