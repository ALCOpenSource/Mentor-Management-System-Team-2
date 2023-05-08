import styles from "./styles/custom_tab.module.scss";
import Link from "next/link";
import PropTypes from "prop-types";

export const CustomTab = (props) => {
  const { children, tabs } = props;
  return (
    <div>
      <div
        className={`${styles.tab_header} flex flex-justify-around`}
        style={{ borderBottom: "1px solid #CCCCCC" }}>
        {tabs?.map((item) => (
          <Link
            key={item.name}
            className={styles.tab_title}
            href={`${item.link}`}>
            {item.name}
          </Link>
        ))}
      </div>
      <>{children}</>
    </div>
  );
};

// [{
//   name: "",
//   createdAt: "",
//   designation: "",
//   programs: [],
//   tasks: [],
//   about: {},
//   certificates: []
// }, {
//   name: "",
//   createdAt: "",
//   designation: "",
//   programs: [],
//   tasks: [],
//   about: {},
//   certificates: []
// }]

CustomTab.prototype = {
  children: PropTypes.node,
  tabs: PropTypes.array,
};
