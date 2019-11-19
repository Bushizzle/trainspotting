import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Map from './Map'
import Options from './Options'

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Map} />
      <Route path="/options" component={Options} />
    </Switch>
  </main>
)

export default Main
