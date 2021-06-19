import { Fragment } from 'react';
import './App.css';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

const App = () => (
  <div className='App'>
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  </div>
);

export default App;
