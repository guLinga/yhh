import { useRoutes } from 'react-router'

import Home from './pages/Home'
import Meeting from './pages/Meeting'

import './App.css'

function App() {
  const element = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/meeting',
      element: <Meeting />,
    },
  ])

  return element
}

export default App
