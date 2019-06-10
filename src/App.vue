<template>
  <div id="app">
    <img alt="Todo logo" src="./assets/todo-list-logo.png">
    <h1>ToDo List App</h1>
    <todo-list></todo-list>
  </div>
</template>

<script>
import TodoList from "./components/TodoList";
export default {
  name: "app",
  components: {
    TodoList
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 30px auto;
  max-width: 550px;
}

img {
  display: block;
  width: 80px;
  height: 80px;
  margin: 0 auto 10px auto;
}
</style>
