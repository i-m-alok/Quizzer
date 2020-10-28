import React from 'react';
import { Route, Switch } from 'react-router-dom'
import AddQuiz from "./components/AddQuiz"
import ShareQuiz from "./components/ShareQuiz"
import './App.css';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/createQuiz"><AddQuiz /></Route>
        <Route path="/Quiz/:id" exact component={ShareQuiz} />
        <Route path="/"><AddQuiz /></Route>
      </Switch>
    </div>
  );
}

export default App;
