import React, { useEffect } from "react";
import Image from "next/image";
import { Modal } from "antd";
import styles from "./componentStyles/splashscreen.module.css";
import { CustomButton } from "./formInputs/CustomInput";
import toast from 'react-hot-toast';
import { deleteTask } from "pages/api/task";
function DeleteTask({
  image,
  message,
  width,
  height,
  isDeleteOpen,
  setIsDeleteOpen,
  data
}) {
  const handleClose = () => {
    setIsDeleteOpen(false);
  };

  const DeleteTask = async (taskId) => {

    try {
      const response = await deleteTask(taskId);
      if (response.status === 200) {
        toast.success(response?.data?.message);
        setIsDeleteOpen(false);
        useEffect(() => {
        }, [response.status === 200])
      }
    } catch (e) {
      console.error('Delete failed:', e);
      toast.error(error);
    } finally {
      setIsDeleteOpen(false);
    }
  };

  return (
    <>
      <Modal
        className={styles.modal}
        centered
        open={isDeleteOpen}
        onOk={handleClose}
        footer={null}
        width={600}
        closable={false}>
        <div className={styles.modal_container}>
          <div>
            <p className={styles.modal_text}>{message}</p>
          </div>

          <div>
            <Image src={image} width={width} height={height} />
          </div>
          <div>
            <CustomButton onClick={handleClose} className={styles.modal_b1}>Undo</CustomButton>
            <CustomButton onClick={()=> DeleteTask(data.id)} className={styles.modal_b2}>Done</CustomButton>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default DeleteTask;
