import './App.css';
import Nav from './components/nav/Nav.js'

function App() {

  return (
    <div className="App">
      <Nav isLoggedIn={true}></Nav>
    </div>
  )
}

export default App;
