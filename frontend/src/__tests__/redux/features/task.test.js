import '@testing-library/jest-dom/extend-expect'

import { addTask, removeTaskById, checkTaskById, getTasks, createTask, removeTask, updateTask } from '../../../redux/features/task'
import { setupStore } from '../../../redux/store'
import fetchMock from 'jest-fetch-mock'

fetchMock.enableMocks()

describe('test redux tasks actions', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })
  test('testing initialState', () => {
    const store = setupStore()
    const state = store.getState().task
    expect(state).toEqual({ tasks: [], isLoading: false, isError: false })
  })
  test('testing add task action', () => {
    const store = setupStore()
    store.dispatch(addTask('task description'))
    const state= store.getState().task
    expect(state.tasks[0].description).toBe('task description')
  })
  test('testing remove task action', () => {
    const preloadedState = {
      task: {
        tasks: [{id: 1, description: 'task description'}],
      }
    }
    const store = setupStore(preloadedState)
    store.dispatch(removeTaskById(1))
    const state= store.getState().task
    expect(state).toEqual({ tasks: [] })
  })
  test('testing update task action', () => {
    const preloadedState = {
      task: {
        tasks: [{id: 1, description: 'task description', active: false}],
      }
    }
    const store = setupStore(preloadedState)
    store.dispatch(checkTaskById(1))
    const state= store.getState().task
    expect(state.tasks[0]).toEqual({id: 1, description: 'task description', active: true})
  })
  test('testing get remote tasks action and return an empty array', async() => {
    fetchMock.mockResponseOnce(JSON.stringify([]))
    const store = setupStore()
    await store.dispatch(getTasks())
    const state = store.getState().task

    expect(state.tasks).toEqual([])
    expect(fetchMock.mock.calls.length).toEqual(1)
    expect(fetchMock.mock.calls[0][0]).toEqual('http://localhost:8080/task')
  })

  test('testing get remote tasks action and return an array', async() => {
    fetchMock.mockResponseOnce(JSON.stringify([{id: 1, description: 'task description', active: false}]))
    const store = setupStore()
    await store.dispatch(getTasks())
    const state = store.getState().task

    expect(state.tasks).toEqual([{id: 1, description: 'task description', active: false}])
    expect(fetchMock.mock.calls.length).toEqual(1)
    expect(fetchMock.mock.calls[0][0]).toEqual('http://localhost:8080/task')
  })

  test('testing post remote task action and return an new object', async() => {
    fetchMock.mockResponseOnce(JSON.stringify({id: 123, description: 'task description 123', active: false}))
    const store = setupStore()
    await store.dispatch(createTask('task description 2'))
    const state = store.getState().task
    
    expect(state.tasks).toEqual([{id: 123, description: 'task description 123', active: false}])
    expect(fetchMock.mock.calls.length).toEqual(1)
    expect(fetchMock.mock.calls[0][0]).toEqual('http://localhost:8080/task')
  })

  test('testing delete remote task action', async() => {
    fetchMock.mockResponseOnce(JSON.stringify('task 1234 removed'))
    const preloadedState = {
      task: {
        tasks: [{id: 1234, description: 'task description'}],
      }
    }
    const store = setupStore(preloadedState)
    await store.dispatch(removeTask(1234))
    const state = store.getState().task
    
    expect(state.tasks).toEqual([])
    expect(fetchMock.mock.calls.length).toEqual(1)
    expect(fetchMock.mock.calls[0][0]).toEqual('http://localhost:8080/task?id=1234')
  })

  test('testing update remote task action', async() => {
    fetchMock.mockResponseOnce(JSON.stringify({id: 12345}))
    const preloadedState = {
      task: {
        tasks: [{id: 12345, description: 'task description', active: false}],
      }
    }
    const store = setupStore(preloadedState)
    await store.dispatch(updateTask(12345))
    const state = store.getState().task
    
    expect(state.tasks).toEqual([{id: 12345, description: 'task description', active: true}])
    expect(fetchMock.mock.calls.length).toEqual(1)
    expect(fetchMock.mock.calls[0][0]).toEqual('http://localhost:8080/task')
  })

})
