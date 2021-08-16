import './App.css';
import {BrowserRouter as Router,Route} from "react-router-dom";
import Login from './components/Login/login';
import Register from "./components/Register/register";
import Home from './components/Home.js/home';
import NewPost from './components/NewPost/NewPost';
import Profile from "./components/Profile/profile";
import Redirekt from "./components/Redirect/redirect";
import Notifications from './components/Notifications/notifications';
import ViewPost from './components/ViewPost/ViewPost';


function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/newpost" exact component={NewPost}/>
        <Route path="/home" component={Home}/>
        <Route path="/profile/:id" component={Profile}/>
        <Route path="/post/:id" component={ViewPost}/>
        <Route path="/notifications" component={Notifications}/>
        <Route path="/" exact component={Redirekt}/>

      </Router>
    </div>
  );
}

export default App;
