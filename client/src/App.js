import './App.css';
import Nav from './components/nav/Nav.js'
import Gallery from './components/gallery/Gallery.js'

function App() {

  return (
    <div className="App">
      <Nav isLoggedIn={true}></Nav>
      <section className="h-28"></section>
      <Gallery/>
    </div>
  )
}

export default App;
