import {  mount, shallowMount, createLocalVue } from '@vue/test-utils'
import TodoList from '@/components/TodoList.vue'
import { MdCheckbox } from 'vue-material/dist/components'

let wrapper;
const localVue = createLocalVue();
localVue.use(MdCheckbox)

describe('TodoList.vue', () => {
  beforeEach(()=>{
    wrapper = shallowMount(TodoList, {
      localVue,
    });
    wrapper.setData({last_id: 0, todos: []})
  });
  afterEach(() => {
    wrapper.destroy();
  });

  describe('TodoList.vue, methods:', () => {
    it('createTodo should add new item on array', () => {
      //Given
      wrapper.setData({newTodo: 'My new todo A'});
      //When
      wrapper.vm.createTodo();
      //Then
      expect(wrapper.vm.newTodo).toBe('')
      expect(wrapper.vm.todos.length).toBe(1)
      expect(wrapper.vm.last_id).toBe(1)
      expect(wrapper.vm.todos[0].text).toBe('My new todo A')
      expect(wrapper.vm.todos[0].id).toBe(1)
    })
    it('createTodo should not add new item on array, nothing was writed', () => {
      //Given
      wrapper.setData({newTodo: ''});
      //When
      wrapper.vm.createTodo();
      //Then
      expect(wrapper.vm.newTodo).toBe('')
      expect(wrapper.vm.todos.length).toBe(0)
      expect(wrapper.vm.last_id).toBe(0)
    })
    it('startEdit should have isEditing equal true', () => {
      //Given
      let dummyTodo = {
        id: 1,
        text: 'Teste editing dummy todo',
        isEditing: false,
        completed: false
      };
      wrapper.setData({todos: [dummyTodo]})
      //When
      wrapper.vm.startEdit(dummyTodo);
      //Then
      expect(wrapper.vm.editTodoCache).toBe('Teste editing dummy todo');
      expect(wrapper.vm.todos.length).toBe(1)
      expect(wrapper.vm.todos[0].text).toBe( 'Teste editing dummy todo');
      expect(wrapper.vm.todos[0].isEditing).toBeTruthy();
    })
    it('cancelEdit should have isEditing equal false', () => {
      //Given
      let dummyTodo = {
        id: 1,
        text: 'Text dummy',
        isEditing: true,
        completed: false
      };
      wrapper.setData({todos: [dummyTodo]})
      wrapper.setData({editTodoCache: 'Teste stop editing todo'})
      //When
      wrapper.vm.cancelEdit(dummyTodo);
      //Then
      expect(wrapper.vm.editTodoCache).toBe('Teste stop editing todo');

      expect(wrapper.vm.todos.length).toBe(1)
      expect(wrapper.vm.todos[0].text).toBe('Teste stop editing todo');
      expect(wrapper.vm.todos[0].isEditing).toBeFalsy();
    })
    it('editTodo should change text and isEditing equal false', () => {
      //Given
      let dummyTodo = {
        id: 1,
        text: 'New text for todo',
        isEditing: true,
        completed: false
      };
      wrapper.setData({todos: [dummyTodo]})
      wrapper.setData({editTodoCache: 'Old text for todo'})
      //When
      wrapper.vm.editTodo(dummyTodo);
      //Then
      expect(wrapper.vm.editTodoCache).toBe('Old text for todo');

      expect(wrapper.vm.todos.length).toBe(1)
      expect(wrapper.vm.todos[0].text).toBe('New text for todo');
      expect(wrapper.vm.todos[0].isEditing).toBeFalsy();
    })
    it('editTodo should not change text, new text is empty', () => {
      //Given
      let dummyTodo = {
        id: 1,
        text: '',
        isEditing: true,
        completed: false
      };
      wrapper.setData({todos: [dummyTodo]})
      wrapper.setData({editTodoCache: 'Old text for todo'})
      //When
      wrapper.vm.editTodo(dummyTodo);
      //Then
      expect(wrapper.vm.editTodoCache).toBe('Old text for todo');

      expect(wrapper.vm.todos.length).toBe(1)
      expect(wrapper.vm.todos[0].text).toBe('Old text for todo');
      expect(wrapper.vm.todos[0].isEditing).toBeFalsy();
    })
    it('deleteTodo should remove item from array and update last_id', () => {
      //Given
      let dummyTodo = {
        id: 1,
        text: '',
        isEditing: true,
        completed: false
      };
      wrapper.setData({todos: [dummyTodo], last_id: 1})
      //When
      wrapper.vm.deleteTodo(dummyTodo);
      //Then
      expect(wrapper.vm.todos.length).toBe(0)
      expect(wrapper.vm.last_id).toBe(0)
    })
  })
  describe('TodoList.vue, computed:', () => {
    it('computed should calc total completed', () => {
      //Given
      let dummyTodo = {
        id: 1,
        completed: true
      };
      let dummyTodo2 = {
        id: 2,
        completed: false
      };
      //When
      expect(wrapper.vm.remaining).toBe(0);
      wrapper.setData({todos: [dummyTodo, dummyTodo2]})
      //Then
      expect(wrapper.vm.remaining).toBe(1)
    })
  })
  describe('TodoList.vue, render:', () => {
    it('teste render', () => {
      const shallowWrapper = shallowMount(TodoList, {
        localVue,
      })
const mountWrapper = mount(TodoList, {
  localVue,
})

console.log(shallowWrapper.html())
console.log(mountWrapper.html())
      //Given
      //When
      //Then
    })
  })
})
