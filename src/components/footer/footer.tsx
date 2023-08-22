import React from 'react';
import './footer.css';

function Footer(props: {
  numberOfActiveTasks: number;
  numberOfFinishedTasks: number;
}) {
  return (
    <div className="footer">
      <div className="footer_tasks-number">
        <p className="footer_active-tasks">
          {' '}
          Active tasks: {props.numberOfActiveTasks}
        </p>
        <p className="footer_finished-tasks">
          {' '}
          Finished tasks: {props.numberOfFinishedTasks}
        </p>
      </div>
      <p className="footer_author-kanban-board">
        {' '}
        Kanban board by Taisiia, 2023
      </p>
    </div>
  );
}

export default Footer;
