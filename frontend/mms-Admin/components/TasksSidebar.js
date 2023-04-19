import React, { useState, useEffect } from 'react'
import styles from "./componentStyles/tasksidebar.module.css";
import Icon from "./Icon";

function TasksSidebar() {

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [items, setItems] = useState([]);
    // /api/items?page=${currentPage}&pageSize=${pageSize}
    // https://api.punkapi.com/v2/beers?page=2&per_page=80
    //  https://api.instantwebtools.net/v1/passenger?page=0&size=10
    const loadMore = () => {
      fetch(`https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=${pageSize}`)
        .then(response => response.json())
        .then(newItems => {
          const updatedItems = items.concat(newItems);
          setItems(updatedItems);
          setCurrentPage(currentPage + 1);
        })
        .catch(error => {
          console.error('Error loading more items:', error);
        });
    };
    
    const handleScroll = () => {
      const element = document.getElementById('scroll-container');
      if (!element) return;
      const { scrollTop, scrollHeight, clientHeight } = element;
      if (scrollTop + clientHeight >= scrollHeight) {
        loadMore();
      } else if (scrollTop === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
    
    useEffect(() => {
      const element = document.getElementById('scroll-container');
      if (element) element.addEventListener('scroll', handleScroll);
      return () => {
        if (element) element.removeEventListener('scroll', handleScroll);
      };
    });
    console.log("items :", items)
  return (
    <div className={styles.main_div} id="scroll-container">
    { items.length > 0 ? (
        items.map(item => (
        <div key={item.id} className={styles.side_container}>
        <div className={styles.side_div_logo}>
        <Icon
        icon={"/assets/images/task.svg"}
        width={"40px"}
        height={"40px"}
        />
        </div>
        <div className={styles.side_div_item}>
        <p>
            Room Library article write...
        </p>
        <div className={styles.side_div_item_div}>
            <Icon
            icon={"/assets/images/ClockLogo.svg"}
            width={"16.5px"}
            height={"16.5px"}
            className={styles.side_div_item_icon}
            />
            <div className={styles.side_div_item_date}>3 days from now</div>
        </div>
        </div>
        </div>
        ))
      ) : (
        <div className={styles.side_container}>
        <div className={styles.side_div_logo}>
        <Icon
        icon={"/assets/images/task.svg"}
        width={"40px"}
        height={"40px"}
        />
        </div>
        <div className={styles.side_div_item}>
        <p>
          Room Library article write...
        </p>
        <div className={styles.side_div_item_div}>
            <Icon
            icon={"/assets/images/ClockLogo.svg"}
            width={"16.5px"}
            height={"16.5px"}
            className={styles.side_div_item_icon}
            />
            <div className={styles.side_div_item_date}>3 days from now</div>
        </div>
        </div>
        </div>
      )
    }
    </div>
  )
}

export default TasksSidebar