import React from "react";
import "./card.css";
import { Link } from "react-router-dom";
import { TaskDto } from "../../../../models/task_dto";

interface CardProps {
    title: string;
    tasks: TaskDto[];
    children?: React.ReactNode;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
    return (
        <div className="card_container">
            <p className="card_title">{props.title}</p>
            <div>
                <ul>
                    {props.tasks.map((task, index) => (
                        <li className="task_header" key={index}>
                            <Link to={`/tasks/${props.title}/${task.guid}`}>
                                {task.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            {props.children}
        </div>
    );
};

export default Card;
