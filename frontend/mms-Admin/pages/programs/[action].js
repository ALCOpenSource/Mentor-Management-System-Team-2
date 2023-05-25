import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "../../styles/programs/create_edit.module.scss";
import Image from "next/image";
import { Button } from "../../components/atoms/Button";
import { Icons } from "../../components/atoms/Icons";
import { Selector } from "../../components/molecules/Selector";
import { ListItem } from "../../components/atoms/Listitem";
import { SuccessModal } from "../../components/molecules/SuccessModal";
import Modal from "../../components/molecules/Modal";
import { useRouter } from "next/router";
import { capitalize } from "../../utils/capitalize";
import { fetchMentorManagers, fetchMentors } from "../api/user/index";
import { createProgram } from "../api/program/index";

const Create = () => {
  const router = useRouter();
  const [listType, setListType] = useState("");
  const [createdSuccessfully, setCreatedSuccessfully] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedManagers, setSelectedManagers] = useState([]);
  const [selectedMentors, setSelectedMentors] = useState([]);
  const { action, id } = router.query;
  const [programName, setProgramName] = useState("");
  const [programDescription, setProgramDescription] = useState("");

  useEffect(async () => {
    if (listType === "mentor") {
      const mentors = await fetchMentors();
      setUsers((prev) => mentors);
    }

    if (listType === "mentor-manager") {
      const mentorManagers = await fetchMentorManagers();
      setUsers((prev) => mentorManagers.data);
    }
  }, [listType]);

  useEffect(async () => {
    if (action === "edit" && id) {
      console.log(action, id);
    }
  }, []);

  function selectUser(id) {
    if (listType === "mentor" && !selectedMentors.includes(id)) {
      setSelectedMentors((prev) => [...prev, id]);
      toast.success("Mentor selected", { id: "user_added" });
    }

    if (listType === "mentor-manager" && !selectedManagers.includes(id)) {
      setSelectedManagers((prev) => [...prev, id]);
      toast.success("Mentor Manager selected", { id: "user_added" });
    }
  }

  function deSelectUser(id) {
    if (listType === "mentor" && selectedMentors.includes(id)) {
      setSelectedMentors((prev) => prev.filter((userID) => userID !== id));
      toast.success("Mentor removed for selection", { id: "user_removed" });
    }

    if (listType === "mentor-manager" && selectedManagers.includes(id)) {
      setSelectedManagers((prev) => prev.filter((userID) => userID !== id));
      toast.success("Mentor Manager removed for selection", {
        id: "user_removed",
      });
    }
  }

  function handleInputChange(e) {
    setProgramName(e.target.value);
  }

  function handleTextAreaChange(e) {
    setProgramDescription(e.target.value);
  }

  async function submitProgramData() {
    const payload = {
      name: programName,
      description: programDescription,
      mentors: selectedMentors,
      mentorManagers: selectedManagers,
      criteria: [],
    };

    const response = await createProgram(payload);
    // alert(JSON.stringify(payload));
    if (response) {
      setCreatedSuccessfully(true);
      resetState();
      return toast.success("Program created successfully.");
    }
    toast.error("Error creating data");
  }

  function editProgram() {
    alert("program edited");
  }

  function resetState() {
    setListType("");
    setUsers([]);
    setSelectedManagers([]);
    setSelectedMentors([]);
    setProgramName("");
    setProgramDescription("");
  }

  return (
    <>
      {action === "create" || action === "edit" ? (
        <div className="flex gap-16">
          <div className={styles.main_content_area}>
            <h1 className={styles.page_title}>
              {capitalize(router.query.action)}
              {router.query.action === "create" && "New"} Program
            </h1>

            <div className={styles.content_wrapper}>
              <div className={`flex flex-align-center gap-16`}>
                <Image
                  src="/assets/images/user_img.svg"
                  width={85}
                  height={85}
                  alt="profile image"
                  className={styles.profile_image}
                />
                <div>
                  <h3>Set Program Avatar</h3>
                  <Button variant="white" bordered size="small">
                    Select file
                  </Button>
                </div>
              </div>

              <div className={styles.input_area}>
                <div className={`mb-1`}>
                  <label className={styles.input_label}>Program Name</label>
                  <div>
                    <input
                      value={programName}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="Enter program name"
                    />
                  </div>
                </div>

                <div>
                  <label className={styles.input_label}>
                    Program Description
                  </label>
                  <div>
                    <textarea
                      value={programDescription}
                      onChange={handleTextAreaChange}
                      className={styles.text_area}></textarea>
                  </div>
                </div>
              </div>

              <div className="flex flex-justify-between mb-3">
                <Selector
                  title="Add Mentor Manager"
                  value={selectedManagers.length}
                  showUserList={() => {
                    setListType("mentor-manager");
                  }}
                />
                <Selector
                  title="Add Mentor"
                  value={selectedMentors.length}
                  showUserList={() => {
                    setListType("mentor");
                  }}
                />
                <Selector
                  title="Set Criteria"
                  value={0}
                  type="link"
                  url="https://google.com"
                />
              </div>

              <div className="flex flex-justify-end">
                <Button
                  onClick={
                    router.query.action === "create"
                      ? submitProgramData
                      : editProgram
                  }
                  variant="normal"
                  size="large">
                  {router.query.action === "edit"
                    ? "Save Changes"
                    : "Create Program"}
                </Button>
              </div>
            </div>
          </div>

          {/* Mentor / Mentor Managers list view */}
          {users.length > 0 && (
            <div className={styles.users_list_area}>
              <div className="flex flex-align-center flex-justify-end gap-16 mb-1">
                <span className="cursor-pointer">
                  <Icons name="search" width="20" fill="#058B94" />
                </span>
                <span className="cursor-pointer">
                  <Icons name="filter" />
                </span>
                <span className="cursor-pointer" onClick={() => setUsers([])}>
                  <Icons name="close" />
                </span>
              </div>

              <div className={styles.users_list}>
                {users?.map((item) => (
                  <ListItem key={item.id}>
                    <div className="flex flex-align-center gap-16">
                      <Image
                        width={50}
                        height={50}
                        src={"/assets/images/user_img.svg"}
                        alt="User profile image"
                        className={`circle-img`}
                      />
                      <div>
                        <h1
                          className={`list_main_text`}>{`${item.first_name} ${item.last_name}`}</h1>
                        <div
                          className={`flex flex-column gap-5 flex-justify-center`}>
                          <p className={`list_sub_text`}>
                            Program Assistant, Andela, She/her
                          </p>

                          <div className="flex gap-10">
                            <p className={`tag`}>PROGRAM ASST.</p>
                            <p className={`tag`}>MENTOR-GADS</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-column gap-16">
                      <span className={`cursor-pointer`}>
                        {[...selectedMentors, ...selectedManagers].includes(
                          item.id,
                        ) ? (
                          <Icons
                            name="subtract"
                            onClick={() => deSelectUser(item.id)}
                          />
                        ) : (
                          <Icons
                            name="circle-add"
                            onClick={() => selectUser(item.id)}
                          />
                        )}
                      </span>
                    </div>
                  </ListItem>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>Url entry not supported</div>
      )}
      <Modal show={createdSuccessfully}>
        <SuccessModal
          title="Program Created Successfully!"
          onConfirm={() => setCreatedSuccessfully(false)}
        />
      </Modal>
    </>
  );
};

export default Create;
