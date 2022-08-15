import React, { useEffect, useState } from 'react';
import Header from './Components/Header';
import Feed from './Components/Feed';
import Footer from './Components/Footer';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  useMutation,
  useUserState,
  useSubscription,
} from '@/CustomHooks';
import { createMessageMutation } from './Controller/Mutation';
import { newMessageSubscription } from './Controller/Subscriptions';

const handleSubscription = (messages = [], response) => {
  return response ? [response.newMessage] : [];
};

const ChatScreen = ({ chat }) => {
  const [messages, setMessages] = useState([]);

  const [userState] = useUserState();

  const [createMessageResult, createMessage] = useMutation({
    query: createMessageMutation,
  });

  const [{ data: newMessages = [] }] = useSubscription(
    { query: newMessageSubscription },
    handleSubscription,
  );

  useEffect(() => {
    setMessages((prevState) => {
      return _.get(chat, 'messages', []);
    });
  }, []);

  useEffect(() => {
    if (!_.isEmpty(newMessages)) {
      setMessages((prevState) => {
        return [...prevState, ...newMessages];
      });
    }
  }, [newMessages]);

  return (
    <div className="flex flex-col h-screen bg-neutral-200">
      <Header title={chat.name} />
      <Feed messages={messages} userId={userState.id} />
      <Footer
        sendMessage={async ({ content }) => {
          await createMessage({
            input: {
              chatId: chat.id,
              content,
              createdBy: userState.id,
              contentType: 'TEXT',
            },
          });
        }}
      />
    </div>
  );
};

ChatScreen.propTypes = {
  chat: PropTypes.object,
};

export default ChatScreen;
