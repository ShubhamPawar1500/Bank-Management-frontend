import logo from './logo.svg';
import './App.css';
import AccountList from './components/AccountList';
import HeaderComponenet from './components/HeaderComponenet';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddAcct from './components/AddAcct';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponenet />
        <div className="container">
          <Routes>
            <Route path='/' Component={AccountList} />
            <Route path='/add-acct' Component={AddAcct} />
            <Route path='/update-acct/:id' Component={AddAcct} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>

  );
}

export default App;
