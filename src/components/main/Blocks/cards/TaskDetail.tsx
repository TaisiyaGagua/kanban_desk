import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { TaskDto } from "../../../../models/task_dto";
import TaskService from "../../../../services/task_service";
import "../../main.css";
import Header from "../../../header/header";
import Footer from "../../../footer/footer";
import { Link } from "react-router-dom";
import Main from "../../main";
import { TaskTrackerService } from "../../../../services/tasktracker_service";

const containerStyle = {
    display: "none",
};

interface TaskDetailProps {
    taskService: TaskService;
}
const TaskDetail: React.FC<TaskDetailProps> = ({ taskService }) => {
    const taskTrackerService = new TaskTrackerService();

    const { guid } = useParams<{ guid: string }>();
    const { category } = useParams<{ category: string }>();

    const tasks = taskService.getTasks(category);
    const task = tasks.find((task) => task.guid === guid);

    const [description, setDescription] = useState(
        task?.description || "This task has no description"
    );

    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setDescription(event.target.value);
    };
    const handleAddDescriptionButtonClick = () => {
        if (task) {
            let dto = {
                name: task.name,
                guid: task.guid,
                description: description,
            } as TaskDto;
            taskService.updateTask(category, guid, dto);
        }
    };
    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div className="taskDetail">
            <Header></Header>{" "}
            <div className="taskDetail_container">
                <Link to="/" className="back_to_main_button">
                    ×
                </Link>
                <h2 className="taskDetail_title">{task.name}</h2>
                <textarea
                    className="taskDetail_description"
                    value={description}
                    onChange={handleDescriptionChange}
                />
                <button
                    className="card_button_add_description"
                    onClick={handleAddDescriptionButtonClick}
                >
                    Add Description
                </button>
            </div>
            <Main
                style={containerStyle}
                taskService={taskService}
                taskTrackerService={taskTrackerService}
            ></Main>
            {/* <Footer numberOfActiveTasks={1} numberOfFinishedTasks={0}></Footer> */}
        </div>
    );
};

export default TaskDetail;
