import React, { useState, useEffect } from 'react'

import { List, ListItem, ListItemText, TextField, Button, ListItemAvatar, Avatar } from '@material-ui/core'

import { auth, database } from './firebaseConf'

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
    const user = auth.currentUser
    const newMessage = {
      text: newMessageText,
      avatar: user && user.photoURL,
      email: user && user.email,
    }

    setNewMessageText('')
    database.ref('messages').push(newMessage)
  }

  const onLogOutClick = () => {
    auth.signOut()
  }

  return (
    <>
      <List>
        {
          messages && messages.map((message) => {

            return (
              <ListItem key={message.key}>
                <ListItemAvatar>
                  <Avatar 
                    src={message.avatar}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={message.text}
                  secondary={message.email}
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
      <Button
        onClick={onLogOutClick}
      >
        LOG OUT
      </Button>
    </>
  )
}

export default Chat