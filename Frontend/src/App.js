
import './App.css';
import Sidebar from './components/Sidebar/Sidebar.js';
import useToken from './useToken';
import Login from './views/Login';

import { Provider } from 'react-redux'
import store from "./redux/Store.js"
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


function App() {
  const { token, setToken } = useToken();
  
  return (
    <div className="App">
      <Provider store={store}>
        {!token ? <Login setToken={setToken} /> :
          <BrowserRouter>
            <Switch>
              <Route path="/admin">
                <Sidebar></Sidebar>
              </Route>
              <Redirect to="/admin"></Redirect>

            </Switch>
          </BrowserRouter>
        }
      </Provider >
    </div>
  );
}

export default App;
