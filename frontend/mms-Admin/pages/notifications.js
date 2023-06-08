import React, {useState} from 'react';
import styles from 'styles/notifications.module.css'
import { Row, Col, Avatar } from 'antd';
import Icon from "../components/Icon";
import Pagination from "../components/Pagination";


function Notifications() {
  const [page, setPage] = useState(1);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  return (
    <div className={styles.container}>
     <div className={styles.header}>
       Notifications
     </div>
     <div className={styles.sub_header}>
       <div className={styles.subp_header}>
         <span>All</span>
       </div>
       <div>
         <span>
          <Pagination
            total={20}
            currentPage={page}
            onPageChange={handlePageChange}
           />
         </span>
       </div>
     </div>
     <Row gutter={[18, 16]}>
      <Col xs={23} sm={23} md={23} lg={23}>
        <div className={styles.item_div}>
          <div className={styles.sub_item_div}>
            <div className={styles.box_avatar}>
            <Avatar
              size={50}
              icon={
              <Icon
                icon={"/assets/images/admin_avatar.png"}
                width={"50px"}
                height={"50px"}
              />
            }
           />
          </div>
          <div className={styles.box_item}>
            <div className={styles.sub_box_item}>
            <p><span>Lex Murphy</span> requested approval for Gads Certificate  by <span>Roseline Anapuna</span></p>
            <span>Today at 9:42 AM</span>
            </div>
            <div className={styles.item_icon}>
              <Icon 
                icon={"/assets/images/dot.svg"}
                width={"20px"}
                height={"20px"}
            />
          </div>
          </div>
          </div>
        </div>
      </Col>
      <Col xs={23} sm={23} md={23} lg={23}>
        <div className={styles.item_div}>
          <div className={styles.sub_item_div}>
            <div className={styles.box_avatar}>
            <Avatar
              size={50}
              icon={
              <Icon
                icon={"/assets/images/admin_avatar.png"}
                width={"50px"}
                height={"50px"}
              />
            }
           />
          </div>
          <div className={styles.box_item}>
            <div className={styles.sub_box_item}>
            <p><span>Lex Murphy</span> requested approval for Gads Certificate  by <span>Roseline Anapuna</span></p>
            <span>Today at 9:42 AM</span>
            </div>
            <div className={styles.item_icon}>
              <Icon 
                icon={"/assets/images/dot.svg"}
                width={"20px"}
                height={"20px"}
            />
          </div>
          </div>
          </div>
        </div>
      </Col>
      <Col xs={23} sm={23} md={23} lg={23}>
        <div className={styles.item_div}>
          <div className={styles.sub_item_div}>
            <div className={styles.box_avatar}>
            <Avatar
              size={50}
              icon={
              <Icon
                icon={"/assets/images/admin_avatar.png"}
                width={"50px"}
                height={"50px"}
              />
            }
           />
          </div>
          <div className={styles.box_item}>
            <div className={styles.sub_box_item}>
            <p><span>Lex Murphy</span> requested approval for Gads Certificate  by <span>Roseline Anapuna</span></p>
            <span>Today at 9:42 AM</span>
            </div>
            <div className={styles.item_icon}>
              <Icon 
                icon={"/assets/images/dot.svg"}
                width={"20px"}
                height={"20px"}
            />
          </div>
          </div>
          </div>
        </div>
      </Col>
      <Col xs={23} sm={23} md={23} lg={23}>
        <div className={styles.item_div}>
          <div className={styles.sub_item_div}>
            <div className={styles.box_avatar}>
            <Avatar
              size={50}
              icon={
              <Icon
                icon={"/assets/images/admin_avatar.png"}
                width={"50px"}
                height={"50px"}
              />
            }
           />
          </div>
          <div className={styles.box_item}>
            <div className={styles.sub_box_item}>
            <p><span>Lex Murphy</span> requested approval for Gads Certificate  by <span>Roseline Anapuna</span></p>
            <span>Today at 9:42 AM</span>
            </div>
            <div className={styles.item_icon}>
              <Icon 
                icon={"/assets/images/dot.svg"}
                width={"20px"}
                height={"20px"}
            />
          </div>
          </div>
          </div>
        </div>
      </Col>
    </Row>
    </div>
  )
}

export default Notifications