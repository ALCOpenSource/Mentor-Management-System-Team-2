import { Icon } from "components/Icon/Icon";
import PrimaryBtn from "../../Buttons/PrimaryBtn";
import Broadcast from "../../Messages/Broadcast";
import PageTitle from "../../Texts/PageTitle";
import TextareaAutosize from "react-textarea-autosize";
import MultiSelect from "../../Select/MultiSelect";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState, useRef } from "react";

// TODO: integrate with backend

const BroadcastMessage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [emoji, setEmoji] = useState(false);
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  const [selected, setSelected] = useState([]);

  const options = [
    { label: "John Doe", value: "John" },
    { label: "Eric Joe", value: "Eric" },
    { label: "Marc Ben", value: "Marc" },
  ];

  const handleMultiSelect = (option) => {
    setSelected(option);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji.native);
  };

  const handleFileChange = (e) => {
    const files = e.target.files[0];
    setFile(files);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.target.value;
      handleSubmit(value);
    }
  };

  const handleAttachment = () => {
    fileRef.current.click();
  };

  const handleSubmit = (text) => {
    const dateInit = new Date();
    const time = dateInit.toLocaleTimeString().replace(/:\d+ /, "");
    const date = dateInit.toISOString().split("T")[0];
    const sender = "John Doe";
    const id = messages[messages.length - 1] + 1 || 1;
    const message = { id, date, time, message: text, sender };
    setMessages([...messages, message]);
    //TODO: upload files and message text
    setMessage("");
    setFile(null);
  };
  return (
    <>
      <div className="container mx-auto p-8 m-5 bg-gray-100">
        <div className="grid grid-cols-2">
          <div>
            <PageTitle />
          </div>
          <div className="justify-self-end">
            <PrimaryBtn />
          </div>
        </div>
        <div className="flex-1 mt-4">
          <MultiSelect
            options={options}
            value={selected}
            onChange={handleMultiSelect}
          />
        </div>

        <div className="flex-1 overflow-auto h-[30rem] bg-[#F7FEFF] border-solid border-1 border-[#E6FDFE] broadcast-body rounded-r-3xl mt-10">
          {messages.map((message) => (
            <Broadcast
              key={message.id}
              message={message.message}
              sender={message.sender}
              time={message.time}
              date={message.date}
            />
          ))}
        </div>

        <div className="flex mt-4">
          <div className="flex-none px-2 py-2" style={{ position: "relative" }}>
            <button onClick={() => setEmoji(!emoji)}>
              <Icon name={"Emoji"} />
            </button>
            {emoji && (
              <>
                <div className="absolute bottom-full left-0 z-10">
                  <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                </div>
              </>
            )}
            <button className="px-1" onClick={handleAttachment}>
              <Icon name={"Attachment"} />
            </button>
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <TextareaAutosize
            className="w-full h-10 px-5 py-2 mb-2 text-base text-gray-700 placeholder-gray-600 border-0 bg-[#F7FEFF] border-[#E6FDFE] rounded-lg focus:outline-none col-span-11 font-mukta"
            placeholder="Type a message..."
            value={message}
            onChange={handleMessageChange}
            onKeyDown={handleKeyDown}
          />
          {file && (
            <p>
              File: {file.name} ({file.type}, {file.size} bytes)
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default BroadcastMessage;
