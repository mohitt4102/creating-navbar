import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import About from "./component/About";
import Home from "./component/Home";
import Services from "./component/Services";
import Careers from "./component/Careers";
import Contact from "./component/Contact";
import Login from "./component/Login";
import Register from "./component/Register";
// import { comma } from "postcss/lib/list";

class App extends Component {

  constructor(props){
    super(props);
    this.state ={
      users: []
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(res => {
      if(res.data){
        console.log(res.data)
      }
    });
  }


  render() {
    return (
      <div className="sidecontent" style={{ display: "flex" }}>
        <Sidebar />
        <div className="maincontent" style={{ flex: 1, padding: "10px" }}>
          {/* Main content area */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/Careers" element={<Careers />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
