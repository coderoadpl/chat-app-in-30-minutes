import React, { useState, useEffect } from 'react'

import { List, ListItem, ListItemText, TextField, Button } from '@material-ui/core'

import { database } from './firebaseConf'

const mapObjectToArray = (obj) => (
  Object.entries(obj || {})
    .map(([key, value]) => (
      typeof value === 'object' ?
        { ...value, key }
        :
        { key, value }
    ))
)

const Chat = (props) => {
  const [newMessageText, setNewMessageText] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    database.ref('messages').on(
      'value',
      (snapshot) => {
        setMessages(mapObjectToArray(snapshot.val()))
      }
    )
  }, [])

  const onSendClick = () => {
    const newMessage = {
      text: newMessageText,
    }

    setNewMessageText('')
    database.ref('messages').push(newMessage)
  }

  return (
    <>
      <List>
        {
          messages && messages.map((message) => {

            return (
              <ListItem key={message.key}>
                <ListItemText
                  primary={message.text}
                  secondary={'secondary'}
                />
              </ListItem>
            )
          })
        }
      </List>
      <TextField
        value={newMessageText}
        onChange={(event) => setNewMessageText(event.target.value)}
      />
      <Button
        onClick={onSendClick}
      >
        SEND
      </Button>
    </>
  )
}

export default Chat