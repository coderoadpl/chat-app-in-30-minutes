import React from 'react'
import ReactDOM from 'react-dom'

import Auth from './Auth'
import Chat from './Chat'

ReactDOM.render(
  <React.StrictMode>

    <Auth>

      <Chat />

    </Auth>

  </React.StrictMode>,
  document.getElementById('root')
)
