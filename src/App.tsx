import Header from "./components/Header"
import Footer from "./components/Footer"
import { useState } from "react"
import Playground from "./components/Playground";

const App = () => {

  const [gridSize, setGridSize] = useState<number>(2);

  return (
    <div className="scroll-smooth">
      <Header grid={(size) => setGridSize(!size ? 0 : size)} />
      <Playground grid_size={gridSize} />
      <Footer />
    </div>
  )
}

export default App