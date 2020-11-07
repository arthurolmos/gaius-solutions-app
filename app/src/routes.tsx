import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Home from './pages/Home'
import Basket from './pages/Basket'


export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/basket" component={Basket}/>
      </Switch>
    </Router>
  )
}
