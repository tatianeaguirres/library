import * as React from 'react';
import { Switch, Route, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import Home from './components/home/Home';
import Create from './components/books/Create';
import EditBook from './components/books/Edit';


class App extends React.Component<RouteComponentProps<any>> {
  public render() {
    return (
      <div>
        <div>
          <h1>Library App</h1>
        </div>

        <nav>
          <ul>
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/create'}>Create Book</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={'/create'} exact component={Create} />
          <Route path={'/edit/:id'} exact component={EditBook} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);