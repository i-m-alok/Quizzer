import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AddQuiz  from "./components/AddQuiz"
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Route path="/" exact>
          <AddQuiz />
        </Route>
      </Router>
    </div>
  );
}

export default App;
