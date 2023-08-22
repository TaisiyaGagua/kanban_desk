import React, { useState } from 'react';
import { TaskDto } from '../../../../models/task_dto';

interface CardDropdownSelectorProps {
  dropDownItems: TaskDto[];
  dropDownOnClick: (taskToTransfer: TaskDto) => void;
}

const CardDropdownSelector = (props: CardDropdownSelectorProps) => {
  const [isDropdown, setIsDropdown] = useState<boolean>(true);

  const handleAddReadyCardClick = (event: any) => {
    setIsDropdown(false);
  };

  const renderDropDownItems = (): JSX.Element[] | undefined => {
    return props.dropDownItems.map((item, index) => (
      <li
        className="main_dropdown_card_title"
        onClick={() => {
          props.dropDownOnClick(item);
          setIsDropdown(true);
        }}
        key={`${item.guid}`}
      >
        {item.name}
      </li>
    ));
  };
  const isLocalStorageEmpty = props.dropDownItems.length === 0;

  return (
    <div>
      {isDropdown ? (
        <button
          className="card_button_add_card"
          onClick={handleAddReadyCardClick}
          disabled={isLocalStorageEmpty}
        >
          + Add card
        </button>
      ) : (
        <div className="main_dropdown_card">{renderDropDownItems()}</div>
      )}
    </div>
  );
};
export default CardDropdownSelector;
