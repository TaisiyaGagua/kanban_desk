import { useEffect, useState } from "react";
import "./main.css";
import Card from "./Blocks/cards/card";
import TaskService from "../../services/task_service";
import { AppConstants } from "../../constants/constants";
import { TaskDto } from "../../models/task_dto";
import CardDropdownSelector from "./Blocks/cards/card_dropdown_selector";
import Footer from "../footer/footer";
import { TaskTrackerService } from "../../services/tasktracker_service";

interface MainProps {
    style?: any;
    taskService: TaskService;
    taskTrackerService: TaskTrackerService;
    children?: any;
}

function Main(props: MainProps) {
    const [backlogItems, setBacklogItems] = useState<TaskDto[]>([]);
    const [readyItems, setReadyItems] = useState<TaskDto[]>([]);
    const [inProcessItems, setInProcessItems] = useState<TaskDto[]>([]);
    const [finishedItems, setFinishedItems] = useState<TaskDto[]>([]);
    const [isAddingCard, setIsAddingCard] = useState<boolean>(true);
    const [currentInput, setCurrentInput] = useState<string>("");
    const [numberOfActiveTask, setNumberOfActiveTask] = useState<number>(0);
    const [numberOfFinishedTasks, setNumberOfFinishedTask] =
        useState<number>(0);

    useEffect(() => {
        setBacklogItems(
            props.taskService.getTasks(AppConstants.BacklogCategory)
        );
        setReadyItems(props.taskService.getTasks(AppConstants.ReadyCategory));
        setInProcessItems(
            props.taskService.getTasks(AppConstants.InProcessCategory)
        );
        setFinishedItems(
            props.taskService.getTasks(AppConstants.FinishedCategory)
        );
        setNumberOfActiveTask(
            props.taskTrackerService.getTasks(AppConstants.numberOfActiveTasks)
        );
        setNumberOfFinishedTask(
            props.taskTrackerService.getTasks(
                AppConstants.numberOfFinishedTasks
            )
        );
    }, []);

    const handleAddCardClick = () => {
        setIsAddingCard(false);
    };

    const handleSubmitButtonClick = (event: any) => {
        if (currentInput) {
            let dto = {
                name: currentInput,
                guid: crypto.randomUUID().toString(),
            } as TaskDto;

            props.taskService.addTask(AppConstants.BacklogCategory, dto);
            setBacklogItems([...backlogItems, dto]);
            setIsAddingCard(true);
            setCurrentInput("");
            setNumberOfActiveTask(numberOfActiveTask + 1);
            props.taskTrackerService.incrementActiveTasks(
                AppConstants.numberOfActiveTasks
            );
        } else {
            setIsAddingCard(true);
        }
    };

    const dropDownReadyOnClick = (task: TaskDto) => {
        props.taskService.transferTask(
            AppConstants.BacklogCategory,
            AppConstants.ReadyCategory,
            task
        );
        setBacklogItems((prevTasks) =>
            prevTasks.filter((prevTask) => prevTask !== task)
        );
        setReadyItems((prevTasks) => [...prevTasks, task]);
        setNumberOfActiveTask(numberOfActiveTask - 1);
        props.taskTrackerService.decrementActiveTasks(
            AppConstants.numberOfActiveTasks
        );
    };

    const dropDownInProgressOnClick = (task: TaskDto) => {
        props.taskService.transferTask(
            AppConstants.ReadyCategory,
            AppConstants.InProcessCategory,
            task
        );
        setReadyItems((prevTasks) =>
            prevTasks.filter((prevTask) => prevTask !== task)
        );
        setInProcessItems((prevTasks) => [...prevTasks, task]);
    };

    const dropDownFinishedOnClick = (task: TaskDto) => {
        props.taskService.transferTask(
            AppConstants.InProcessCategory,
            AppConstants.FinishedCategory,
            task
        );
        setInProcessItems((prevTasks) =>
            prevTasks.filter((prevTask) => prevTask !== task)
        );
        setFinishedItems((prevTasks) => [...prevTasks, task]);
        setNumberOfFinishedTask(numberOfFinishedTasks + 1);
        props.taskTrackerService.incrementActiveTasks(
            AppConstants.numberOfFinishedTasks
        );
    };

    return (
        <div className="main_and_footer">
            <div className="main_background" style={props.style}>
                <Card tasks={backlogItems} title={AppConstants.BacklogCategory}>
                    {isAddingCard ? (
                        <button
                            className="card_button_add_card"
                            onClick={handleAddCardClick}
                        >
                            + Add card
                        </button>
                    ) : (
                        <div>
                            <input
                                className="input_task"
                                type="text"
                                value={currentInput}
                                onChange={(e) =>
                                    setCurrentInput(e.target.value)
                                }
                                placeholder=" "
                            />
                            <button
                                className="card_button_submit"
                                onClick={handleSubmitButtonClick}
                            >
                                Submit
                            </button>
                        </div>
                    )}
                </Card>
                <Card tasks={readyItems} title={AppConstants.ReadyCategory}>
                    <CardDropdownSelector
                        dropDownItems={backlogItems}
                        dropDownOnClick={dropDownReadyOnClick}
                    ></CardDropdownSelector>
                </Card>
                <Card
                    tasks={inProcessItems}
                    title={AppConstants.InProcessCategory}
                >
                    <CardDropdownSelector
                        dropDownItems={readyItems}
                        dropDownOnClick={dropDownInProgressOnClick}
                    ></CardDropdownSelector>
                </Card>
                <Card
                    tasks={finishedItems}
                    title={AppConstants.FinishedCategory}
                >
                    <CardDropdownSelector
                        dropDownItems={inProcessItems}
                        dropDownOnClick={dropDownFinishedOnClick}
                    ></CardDropdownSelector>
                </Card>
            </div>

            <Footer
                numberOfActiveTasks={numberOfActiveTask}
                numberOfFinishedTasks={numberOfFinishedTasks}
            ></Footer>
        </div>
    );
}

export default Main;
