import Filler from './Filler';
import './App.css'
import FileUpload from './FileUpload';
import Info from './Info';

function App() {

  return (
    <>
    <div className="app">
      <Filler />
      <FileUpload />
    </div>
    <div className="info">
      <Info />
    </div>
    </>
  )
}

export default App
