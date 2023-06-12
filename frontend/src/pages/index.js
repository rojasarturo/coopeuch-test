import { useEffect } from 'react'
import Box from '@mui/material/Box'
import { useSelector, useDispatch } from 'react-redux'

import { getTasks, createTask, removeTask, updateTask } from '../redux/features/task'
import Navbar from '../component/Navbar'
import Tasks from '../component/Tasks'
import Form from '../component/Form'

export default function Layout () {
  const dispatch = useDispatch()
  const { tasks } = useSelector((state) => state.task)

  const handleSubmit = (event) => {
    event.preventDefault()
    const description = event.target.elements.description.value
    if (description) {
      dispatch(createTask(description))
      event.target.elements.description.value = ''
    }
  }

  const removeTaskHandle = (id) => {
    dispatch(removeTask(id))
  }

  const checkTaskHandle = (id) => {
    dispatch(updateTask(id))
  }

  useEffect(() => {
    try {
      dispatch(getTasks())
    } catch (error) {
      console.log(error)
    }
    
  }, [dispatch])

  return (
    <>
      <Navbar />
      <Form handleSubmit={handleSubmit}></Form>
      <Box sx={{ m: 2 }}></Box>
      <Tasks tasks={tasks} removeTaskHandle={removeTaskHandle} checkTaskHandle={checkTaskHandle}></Tasks>
    </>
  )
}
