import {React} from 'react'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import List from './Components/List';
import Header from './Components/Header'

const App = () => {
  return (
    <div className='wrapper'>
      <Header />
      <main className='content'>
        <List />
      </main>
    </div>
  )
}

export default App;
