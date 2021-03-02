import React from "react";
import Chat, { Bubble, useMessages } from "@chatui/core";
import "./styles.css";
import "@chatui/core/dist/index.css";
import { Notice } from "@chatui/core";

export default function App() {
  const { messages, appendMsg, setTyping } = useMessages([]);

  function handleSend(type, val) {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right"
      });

      setTyping(true);

      setTimeout(() => {
        appendMsg({
          type: "text",
          content: { text: "Bala bala" }
        });
      }, 1000);
    }
  }

  function NoticeInfo() {
    function handleLinkClick(url) {
      console.log("url", url);
    }

    function handleClose() {
      console.log("close");
    }
    return (
      <Notice
        content="公告内容"
        url="https://www.taobao.com/"
        onLinkClick={handleLinkClick}
        onClose={handleClose}
      />
    );
  }

  function renderMessageContent(msg) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }
  return (
    <Chat
      navbar={{ title: "智能助理" }}
      messages={messages}
      recorder={{ canRecord: true }}
      toolbar={[
        {
          type: "speech",
          icon: "mic",
          title: "语音输入"
        }
      ]}
      renderBeforeMessageList={() => (
        <NoticeInfo style={{ position: "sticky" }} />
      )}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
    />
  );
}
