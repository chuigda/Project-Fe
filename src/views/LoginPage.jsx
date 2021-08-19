import React from 'react'
import {
  Form, Input, Button, message
} from 'antd'
import PropTypes from 'prop-types'

import { mobius } from '../utils/mobius'
import { setLocalStorage } from '../utils/localStorage'
import { userCreds } from '../config/config'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  handleSubmit(values) {
    console.trace(values)
    const self = this
    const impl = async () => {
      const result = await mobius.post('/api/login').data(values).do()
      if (result.success) {
        for (const cred of userCreds) {
          setLocalStorage(cred.storageName, result.data[cred.key])
        }
        self.props.history.push('/')
      } else {
        message.error(result.message)
      }
    }
    impl().then(() => {}).catch(console.trace)
  }

  render() {
    return (
      <Form onFinish={this.handleSubmit}>
        <Form.Item name="userName">
          <Input placeholder="user name" />
        </Form.Item>
        <Form.Item name="password">
          <Input placeholder="user password" />
        </Form.Item>
        <Button htmlType="submit">Login</Button>
      </Form>
    )
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired
}

export default Login
