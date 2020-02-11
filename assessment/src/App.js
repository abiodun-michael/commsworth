import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './component/Header';
import Login from './component/Login';
import Location from './component/Location';
import { AuthProvider } from './context/auth';
import LoadProject from './component/LoadProject';
import CreateProject from './component/CreateProject';
import AuthRoute from './context/AuthRoute';


class App extends Component {

  render(){
  return (
    <AuthProvider>
      <Router basename={"/commsworth"}>
        <Header />
        <Switch>
        <AuthRoute exact path='/' component={Login}/>
        <Route exact path='/location' component={Location}/>
        <Route exact path='/projects' component={LoadProject}/>
        <Route exact path='/create' component={CreateProject}/>
        </Switch>
      </Router>
      </AuthProvider>
  );
  }
}

export default App;
