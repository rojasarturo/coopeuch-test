import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from 'react-router-dom'

import MainComponent from '../pages/index'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<MainComponent />}></Route>
    <Route path="*" element={<Navigate to="/" />} />
    </>
  )
)

export default router
