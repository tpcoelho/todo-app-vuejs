<template>
  <div class="container">
    <div class="input-newtodo">
      <input
        data-test="todo-input"
        placeholder="How to go to the next stage?"
        v-model="newTodo"
        @keyup.enter="createTodo"
      >
    </div>
    <div class="todo-list">
      <div v-for="todo in todos" :key="todo.id" class="list">
        <!-- Checke box -->
        <div>
          <md-checkbox :id="'cb'+todo.id" v-model="todo.completed"></md-checkbox>
        </div>
        <!-- Text Todo -->
        <div
          class="todo-text text-center"
          :class="{completed: todo.completed}"
          v-if="!todo.isEditing"
          @dblclick="startEdit(todo)"
        >{{ todo.text }}</div>

        <div class="todo-text" v-else>
          <input
            type="text"
            v-focus
            v-model="todo.text"
            @keyup.enter="editTodo(todo)"
            @keyup.esc="cancelEdit(todo)"
            @blur="cancelEdit(todo)"
          >
        </div>
        <!-- Buttons -->
        <div v-if="!todo.isEditing">
          <span class="todo-btn" @click="startEdit(todo)">
            <i class="fas fa-edit"></i>
          </span>
          <span class="todo-btn" @click="deleteTodo(todo)">
            <i class="fa fa-trash"></i>
          </span>
        </div>
      </div>
    </div>
    <footer>
      <span>{{ remaining }} items left.</span>
    </footer>
  </div>
</template>

<script>
const LOCAL_STORAGE_KEY = "todo-app-bd";
const LAST_KEY = "todo-app-last-key";

export default {
  name: "TodoList",
  data() {
    return {
      last_id: localStorage.getItem(LAST_KEY) || 5,
      newTodo: "",
      editTodoCache: "",
      todos: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [
        {
          id: 1,
          text: "add todo",
          isEditing: false,
          completed: true
        },
        {
          id: 2,
          text: "remove todo",
          isEditing: false,
          completed: true
        },
        {
          id: 3,
          text: "edit todo",
          isEditing: false,
          completed: true
        },
        {
          id: 4,
          text: "test unitario",
          isEditing: false,
          completed: true
        },
        {
          id: 5,
          text: "Refactor for new components",
          isEditing: false,
          completed: false
        }
      ]
    };
  },
  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length;
    }
  },
  methods: {
    createTodo() {
      if (this.newTodo.trim() == "") {
        return;
      }
      let newTodo = {
        id: ++this.last_id,
        text: this.newTodo,
        isEditing: false,
        completed: false
      };
      this.todos.push(newTodo);
      this.newTodo = "";
    },
    startEdit(todo) {
      todo.isEditing = true;
      this.editTodoCache = todo.text;
    },
    editTodo(todo) {
      if (todo.text.trim() == "") {
        todo.text = this.editTodoCache;
      }
      todo.isEditing = false;
    },
    cancelEdit(todo) {
      todo.isEditing = false;
      todo.text = this.editTodoCache;
    },
    deleteTodo(todo) {
      const indexTodo = this.todos.indexOf(todo);
      this.todos.splice(indexTodo, 1);
      --this.last_id;
    }
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  },
  watch: {
    todos: {
      deep: true,
      handler(newValue) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue));
      }
    },
    last_id: function(last_id) {
      localStorage.setItem(LAST_KEY, last_id);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-checkbox {
  --md-theme-default-accent: #ffb355; /* This one will win !*/
}
.container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
.input-newtodo {
  display: flex;
  border: 1px solid #fff1da;
}
.input-newtodo input {
  border: none;
  flex: 1;
  padding: 0 15px;
}
.todo-list {
  display: flex;
  flex-direction: column;
}
.todo-list .list {
  display: flex;
}
.todo-list .list:hover {
  background: #ffdfb6;
}
.todo-list .list .todo-text {
  display: flex;
  flex: 1;
}
.todo-list .list .todo-text input {
  flex: 1;
  border: none;
  border: 1px solid #fff1da;
}
.text-center {
  align-items: center;
}
.todo-list .todo-btn {
  padding: 0 0.1rem;
}
.todo-list .list .completed {
  text-decoration: line-through;
  color: #9f9f9f;
}
footer {
  padding: 3px 0;
  background: #ffc378;
  border-radius: 3px;
}
</style>
