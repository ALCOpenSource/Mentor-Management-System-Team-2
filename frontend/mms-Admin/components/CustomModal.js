import { Button, Modal, Row, Col, Input, message, Upload } from "antd";
import { useState, useEffect } from "react";
import SuccessMessage from "./SuccessMessage";
import {
  CustomButton,
  CustomInput,
  CustomTextArea,
  Label,
} from "./formInputs/CustomInput";
import styles from "../styles/admin/discussionForum.module.css";
import { Icon } from "./Icon/Icon";
import InputEmoji from "react-input-emoji";
import EmojiPicker from "emoji-picker-react";
import { createPost } from "utils/http";

export const CustomFormModal = ({
  newTopic,
  setNewTopic,
  formData,
  setFormData,
  posts,
  setPosts,
  setSuccess,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [emojis, showEmojis] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token"))) {
      setToken(JSON.parse(localStorage.getItem("token")));
      setUserId(JSON.parse(localStorage.getItem("userid")));
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const handleSubmit = async (event) => {
    //call api here
    event.preventDefault();
    try {
      if (!formData.title || !formData.description) {
        console.log("we are here");
        setConfirmLoading(false);
        return;
      }

      setConfirmLoading(true);

      const response = await createPost(token, fileList, formData);

      console.log(response);
      console.log("something is wrong");
      if (response?.status === 201) {
        setConfirmLoading(true);
        setPosts((posts) => [...posts, formData]);
        setFormData({});
        setNewTopic(false);
        setSuccess(true);
      }

      if (
        response?.status === 401 ||
        response?.status === 400 ||
        response?.status === 403
      ) {
        setConfirmLoading(false);
        throw response;
      }
    } catch (e) {
      console.log(e);
      setConfirmLoading(false);
    }
  };
  const handleCancel = () => {
    setNewTopic(false);
  };

  return (
    <>
      <Modal
        className={styles.modal}
        open={newTopic}
        onOk={handleSubmit}
        width={866}
        footer={
          <CustomButton loading={confirmLoading} onClick={handleSubmit}>
            Post to forum
          </CustomButton>
        }
        confirmLoading={confirmLoading}
        closable={false}>
        <Row className={styles.modal_container}>
          <Row className={styles.header_row}>
            <div className={styles.topic}>New Topic</div>
            <div style={{ cursor: "pointer" }} onClick={handleCancel}>
              <Icon name="Close" />
            </div>
          </Row>

          <CustomInput
            placeholder="Enter a title"
            className={styles.mb_title}
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <Row className={styles.body_row}>
            <CustomTextArea
              rows={6}
              placeholder="start typing ..."
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={styles.textarea}
            />
            <Row className={styles.emojis}>
              <Row>
                <Col
                  onClick={() => {
                    showEmojis(!emojis);
                  }}
                  className={styles.smiley}>
                  <Icon name="SmileyFace" />
                </Col>

                <Upload {...props} className={styles.smiley}>
                  <Icon name="Pin" color="#058B94" />
                </Upload>
              </Row>
            </Row>
            <Row className={styles.emojis_container}>
              {emojis && (
                <EmojiPicker
                  onEmojiClick={(emoji, e) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      description: prevState.description + emoji.emoji,
                    }));
                  }}
                  skinTonesDisabled={true}
                  width={"100%"}
                />
              )}
            </Row>
          </Row>
        </Row>
      </Modal>
    </>
  );
};
