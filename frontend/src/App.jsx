import { Box } from "@chakra-ui/react"
import { Route, Routes } from 'react-router-dom'
import CreatePage from './pages/createPage.jsx'
import HomePage from './pages/homePage.jsx'
import Navbar from './components/ui/navbar.jsx'
import { useColorModeValue } from "./components/ui/color-mode.jsx"

function App() { 

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
