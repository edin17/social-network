import './App.css';
import {BrowserRouter as Router,Route} from "react-router-dom";
import Login from './components/Login/login';
import Register from "./components/Register/register";
import Home from './components/Home.js/home';
import NewPost from './components/NewPost/NewPost';
import Profile from "./components/Profile/profile";


function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/newpost" exact component={NewPost}/>
        <Route path="/home" component={Home}/>
        <Route path="/profile/:id" component={Profile}/>

      </Router>
    </div>
  );
}

export default App;
