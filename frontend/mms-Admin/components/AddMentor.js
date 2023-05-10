import React from "react";
import { Modal } from "antd";
import styles from "./componentStyles/splashscreen.module.css";
import { CustomButton, CustomInput } from "./formInputs/CustomInput";
import toast from 'react-hot-toast';
import { inviteMentor } from "pages/api/user";

function AddMentor({
  message,
  isOpen,
  setIsOpen,
}) {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    roleId: 2
  });
  const handleClose = () => {
    setIsOpen(false);
  };

  const validateForm = () => {
    if (formData.firstName.length < 4 || formData.email.length < 4 || formData.lastName.length < 4 ) {
      window.alert('First name, Last name and email must be at least 4 characters long.');
      return false;
    }
    return true;
  };
  
  const InviteMentor = async () => {
    try {

      const isFormValid = validateForm();
      if (!isFormValid) return;

      const response = await inviteMentor(formData);
      console.log(response)
      if (response.status === 200) {
        toast.success(response?.data?.message);
        setIsOpen(false);
      }
    } catch (e) {
      console.error('Invite failed:', e);
      toast.error(e);
    }
  };
  const handleInviteMentor = event => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      <Modal
        className={styles.modal}
        centered
        open={isOpen}
        onOk={handleClose}
        footer={null}
        width={500}
        closable={false}>
        <div className={styles.modal_container}>
          <div>
            <p className={styles.modal_text}>{message}</p>
          </div>
          <form>
          <div className={styles.invite_input}>
            <div className={styles.invite_input_name}>
              <div className={styles.invite_input_name_first}>
                <CustomInput
                placeholder="Enter First Name"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleInviteMentor}
              />
              </div>
              <div>
                <CustomInput
                placeholder="Enter Last Name"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleInviteMentor}
              />
              </div>
            </div>
            <CustomInput
              size="large"
              placeholder="Enter Email Address"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInviteMentor}
          />
          </div>
          <div className={styles.invite_input_name_btn}>
            <CustomButton onClick={handleClose} className={styles.modal_b1}>Cancel</CustomButton>
            <CustomButton onClick={InviteMentor} className={styles.modal_b2}>Send</CustomButton>
          </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default AddMentor;
