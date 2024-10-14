import React, { useState } from "react";
import "./App.css";
import { NewTodoForm } from './components/NewTodoForm/NewTodoForm'
import { Todos } from './components/Todos/Todos'

function App() {
    const [show, setShow] = useState(false);
    return (
        <div className="App">
            <div className="container">
                <h1 className="App__title">todos</h1>
                <div className="App__content">
                    <NewTodoForm show={show} setShow={setShow} />
                    {show && <Todos />}
                </div>
            </div>
        </div>
    );
}

export default App;
