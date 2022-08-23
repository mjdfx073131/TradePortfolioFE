import React from 'react';
import './App.css';
import {Route, Switch, BrowserRouter, Link} from 'react-router-dom';
import ProjectGetEntry from './components/ProjectGetEntry';
// import ProjectUpdateEntry from './components/ProjectUpdateEntry';
import ProjectDelete from './components/ProjectDelete';
import ProjectList from './components/ProjectList';
// import ProjectScan from './components/ProjectScan';
import ProjectAdd from './components/ProjectAdd';
import Advice from './components/Advice';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="topnav">
          <a href='.' className="tabReact"  style={{ textDecoration: 'none' }}>
            <div className="ind">Trade Portfolio</div>
          </a>
        <Link to={'/add'} className="tabReact" style={{textDecoration: 'none'}}>
          <div className="ind">Add</div>
        </Link>
        <Link to={'/get'} className="tabReact" style={{textDecoration: 'none'}}>
          <div className="ind">Get</div>
        </Link>
        <Link to={'/scan'} className="tabReact" style={{textDecoration: 'none'}}>
          <div className="ind">Scan</div>
        </Link>
        <Link to={'/delete'} className="tabReact" style={{textDecoration: 'none'}}>
          <div className="ind">Delete</div>
        </Link>
      </div>
      <header className="App-header">
        <Switch>
          <Route exact path='/'>
              <Advice></Advice>
          </Route>
          <Route exact path='/get'>
            <ProjectGetEntry />
          </Route>
          <Route exact path = "/add">
            <ProjectAdd />
            <br/>
            <ProjectList/>
          </Route>
          <Route exact path = '/delete'>
            <ProjectDelete/>
            <br/>
            <ProjectList/>
          </Route>
        </Switch>
      </header>
      <div>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
