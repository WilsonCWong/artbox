import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setFlash, emptyFlash } from "../actions/ui";
import { valuesIn, flatten } from "lodash-es";

function extractMessages(m) {
  return flatten(valuesIn(m));
}

export function useFlash() {
  const flash = useSelector(state => state.ui.flashMessages);
  const type = useSelector(state => state.ui.messageType);
  const dispatch = useDispatch();

  const [messages, setLocalMessages] = useState([]);
  const [messageType, setMessageType] = useState(type);

  useEffect(() => {
    setMessages(flash);
    setMessageType(type || 'error');
    dispatch(emptyFlash());
  }, []);

  const dispatchMessages = (m, t) => {
    dispatch(setFlash(extractMessages(m), t));
  };

  const setMessages = (m, t = 'error') => {
    setLocalMessages(extractMessages(m));
    setMessageType(t);
  };

  const removeMessage = m => {
    let index = messages.indexOf(m);

    if (index > -1) {
      let splicedMessages = [...messages];
      splicedMessages.splice(index, 1);
      setLocalMessages(splicedMessages);
    }
  };


  return { messages, messageType, setMessages, dispatchMessages, removeMessage };
}