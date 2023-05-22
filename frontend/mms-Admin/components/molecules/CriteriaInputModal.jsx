import React, { useState } from "react";
import { Button } from "../../components/atoms/Button";
import styles from "../../styles/criteria-setup.module.scss";

const inputOptions = [
  { id: 1, name: "Single Input" },
  { id: 2, name: "Multiple Input" },
  { id: 3, name: "Yes/No" },
  { id: 4, name: "File Input" },
  { id: 5, name: "Multi-Choice" },
];

export const CriteriaInputModal = ({ onClose, onConfirm }) => {
  const [selectedInputOption, setSelectedInputOption] = useState("");

  return (
    <div>
      {!selectedInputOption ? (
        <CriteriaInputOptions setSelectedInputOption={setSelectedInputOption} />
      ) : (
        <AddQuestionsScreen selectedInputOption={selectedInputOption} />
      )}

      <div className={`flex flex-justify-between ${styles.action_buttons}`}>
        <Button variant="transparent" size="small" bordered onClick={onClose}>
          Cancel
        </Button>
        {selectedInputOption && (
          <Button variant="normal" size="small" bordered onClick={onClose}>
            Done
          </Button>
        )}
      </div>
    </div>
  );
};

function CriteriaInputOptions({ setSelectedInputOption }) {
  function handleSelect(e) {
    setSelectedInputOption(e.target.value);
  }

  return (
    <>
      <h1 className={`${styles.input_modal_title}`}>Select Input Type</h1>

      <div className={`flex flex-column ${styles.input_type_options}`}>
        {inputOptions.map((item) => {
          return (
            <label htmlFor={item.id} key={item.id}>
              <input
                id={item.id}
                name="input_option"
                type="radio"
                onClick={handleSelect}
                value={item.name}
              />
              <div>{item.name}</div>
            </label>
          );
        })}
      </div>
    </>
  );
}

function AddQuestionsScreen({ selectedInputOption }) {
  if (selectedInputOption === "Single Input")
    return (
      <div>
        <input
          className={`${styles.input}`}
          placeholder="Input question here"
        />
      </div>
    );

  if (selectedInputOption === "Multiple Input")
    return (
      <>
        <div>
          <input
            className={`${styles.input}`}
            placeholder="Type your question here"
          />
        </div>
        <div className={`${styles.select_wrapper}`}>
          <select className={`${styles.select}`}>
            <option value="1">1 input</option>
            <option value="2">2 inputs</option>
            <option value="3">3 inputs</option>
            <option value="4">4 inputs</option>
            <option value="5">5 inputs</option>
          </select>
          <span class="focus"></span>
        </div>
      </>
    );
  return <div>{selectedInputOption}</div>;
}
