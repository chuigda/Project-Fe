import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { createHashHistory } from 'history'
import 'antd/dist/antd.css'

import Login from './views/LoginPage.jsx'

const history = createHashHistory()

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <Login history={history}/>
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
)

export default App
