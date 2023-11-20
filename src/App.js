import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./Layout"; 
import Home from './Home';
import TimeSlot from './TimeSlot';
import Course from './Course';
import Login from "./Login";
import Posts from './Posts';
import AddPost from './AddPost';
import Todos from './Todos';
import AddTodos from "./AddTodos";
import MasterAccount from "./MasterAccount";
import AddMasterAC from "./AddMasterAC";
import MasterAC from "./MasterAC";
import Master from "./Master";
import ChartoFAccount from "./ChartoFAccount";
import GeneralJournal from "./GeneralJournal";
import TrailBalan from "./TrailBalan";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <Routes>
            <Route path='/Home' element={<Home />} />
            <Route path='/Master' element={<Master />} />
            <Route path='/TimeSlot' element={<TimeSlot />} />
            <Route path='/MasterAC' element={<MasterAC />} />
            <Route path='/MasterAccount' element={<MasterAccount />} />
            <Route path='/AddMasterAC' element={<AddMasterAC />} />
            <Route path='/Course' element={<Course />} />
            <Route path='/Posts' element={<Posts />} />
            <Route path='/Posts/AddPost/:id?' element={<AddPost />} />
            <Route path='/ChartoFAccount' element={<ChartoFAccount />} />
            <Route path='/GeneralJournal' element={<GeneralJournal />} />
            <Route path='/Todos/AddTodos/:id?' element={<AddTodos />} />
          </Routes>
        </Layout>
      </Router>
    );
  }
}

export default App;
