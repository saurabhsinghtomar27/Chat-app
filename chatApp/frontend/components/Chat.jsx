// import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
    Sidebar,
    Search,
    ConversationList,
    Conversation,
    EllipsisButton,
    VoiceCallButton,
    ConversationHeader,
    VideoCallButton,
    ChatContainer,
    MessageList,
    Avatar,
    MessageSeparator,
    Message,
    TypingIndicator,
    MessageInput,
  } from "@chatscope/chat-ui-kit-react";
import React from "react";
import getusers from "../src/context/getusers.js";
const Chat = () => {
     getusers()
  return (
<div style={{ position: "relative", height: "500px" }}>
<link rel="stylesheet" href="/node_modules/@chatscope/chat-ui-kit-styles/dist/default/styles.min.css" />
<MainContainer
  responsive
  style={{
    height: '600px'
  }}
>
  <Sidebar
    position="left"
  >
    <Search placeholder="Search..." />
    <ConversationList>
      <Conversation
        info="Yes i can do it for you"
        lastSenderName="Lilly"
        name="Saurabh"
      >
        <Avatar
          name="Lilly"
          src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
          status="available"
        />
     </Conversation>
    </ConversationList>
  </Sidebar>
  <ChatContainer>
    <ConversationHeader>
      <ConversationHeader.Back />
      <Avatar
        name="Zoe"
        src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
      />
      <ConversationHeader.Content
        info="Active 10 mins ago"
        userName="Zoe"
      />
      <ConversationHeader.Actions>
        <VoiceCallButton />
        <VideoCallButton />
        <EllipsisButton orientation="vertical" />
      </ConversationHeader.Actions>
    </ConversationHeader>
    <MessageList typingIndicator={<TypingIndicator content="Zoe is typing" />}>
      <MessageSeparator content="Saturday, 30 November 2019" />
      <Message
        model={{
          direction: 'incoming',
          message: 'Hello my friend',
          position: 'single',
          sender: 'Zoe',
          sentTime: '15 mins ago'
        }}
      >
        <Avatar
          name="Zoe"
          src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
        />
      </Message>
    </MessageList>
    <MessageInput placeholder="Type message here" />
  </ChatContainer>
</MainContainer>
  </div>
  );
}

export default Chat;