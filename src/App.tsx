import React, { FunctionComponent, useState, useEffect } from 'react';
import './App.css';
import {Route, Switch, BrowserRouter, Link} from 'react-router-dom';
import ProjectDelete from './components/ProjectDelete';
import ProjectList from './components/ProjectList';
import ProjectScan from './components/ProjectScan';
import ProjectAdd from './components/ProjectAdd';
import Advice from './components/Advice';
import { Order } from './types/types';
import OrderService from './services/OrderService';
function App() {
  const emptyProjectsList: Order[] = [];
  const [allProjects, setAllProjects] = useState(emptyProjectsList);
  function getAllProjects(): void {
    OrderService.getAllOrder().then((response: any) => {
      setAllProjects(response.data);
      console.log(response.data);
    });
  }
  useEffect(() => {
    getAllProjects();
  }, []);

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
        <Link to={'/filter'} className="tabReact" style={{textDecoration: 'none'}}>
          <div className="ind">Filter</div>
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
          <Route exact path = "/add">
              <ProjectAdd getAllProjects={getAllProjects} />
            <br/>
              <ProjectList allProjects={allProjects}/>
          </Route>
          <Route exact path = "/filter">
            <ProjectScan />
            <br/>
          </Route>
          <Route exact path = '/delete'>
              <ProjectDelete getAllProjects={getAllProjects} />
            <br/>
              <ProjectList allProjects={allProjects} />
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
