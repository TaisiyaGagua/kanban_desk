import React from "react";
import Header from "./components/header/header";
import Main from "./components/main/main";
import "./App.css";
import TaskService from "./services/task_service";
import { TaskTrackerService } from "./services/tasktracker_service";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskDetail from "./components/main/Blocks/cards/TaskDetail";
import "./App.css";

const App: React.FC = () => {
    const taskService = new TaskService();
    const taskTrackerService = new TaskTrackerService();

    return (
        <Router>
            <Routes>
                <Route
                    path="/tasks/:category/:guid"
                    element={<TaskDetail taskService={taskService} />}
                />{" "}
                <Route
                    path="/"
                    element={
                        <div className="App">
                            <Header></Header>
                            <Main
                                taskService={taskService}
                                taskTrackerService={taskTrackerService}
                            ></Main>
                        </div>
                    }
                />{" "}
            </Routes>
        </Router>
    );
};

export default App;
