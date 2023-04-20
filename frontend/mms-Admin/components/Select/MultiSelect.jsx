import Select, {components} from "react-select";
import { Icon } from "../Icon/Icon";

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: 'none',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#058B94",
    marginRight: "8px",
    "&:hover": {
      color: "#035D63",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

const customIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <Icon name={"DropDownIndicator"} />
    </components.DropdownIndicator>
  );
};

const MultiSelect = ({ options, value, onChange }) => {
  const handleChange = (selected) => {
    onChange(selected);
  };

  return (
    <Select
      options={options}
      value={value}
      onChange={handleChange}
      styles={customStyles}
      components={{ DropdownIndicator: customIndicator }}
      isMulti
    />
  );
};

export default MultiSelect;
