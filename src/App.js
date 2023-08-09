
import './App.css';
import AccountList from './components/AccountList';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddAcct from './components/AddAcct';
import Login from './components/Login';
import Register from './components/Register';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import Users from './components/Users';
// import HeaderComponenet from './components/HeaderComponenet';

function App() {
  return (
    <div>
      <Router>
        <ToastContainer />
        {/* <HeaderComponenet /> */}
        <div className="container">
          <Routes>
            <Route path='/home' Component={AccountList} />
            <Route path='/add-acct' Component={AddAcct} />
            <Route path='/update-acct/:id' Component={AddAcct} />
            <Route path='/' Component={Login} />
            <Route path='/register' Component={Register} />
            <Route path='/users' Component={Users} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>

  );
}

export default App;
