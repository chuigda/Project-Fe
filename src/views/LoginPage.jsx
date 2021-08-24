import React from 'react'
import {
  Form,
  Input,
  Button,
  message as messager
} from 'antd'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { mobius } from '../utils/mobius'
import { saveCreds } from '../utils/credUtil'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(values) {
    const self = this
    const impl = async () => {
      const { success, message, result } = await mobius.post('/api/login').data(values).do()
      if (success) {
        saveCreds(result)
        self.props.history.replace('/index')
      } else {
        messager.error(message)
      }
    }
    impl().then(() => {}).catch(e => messager.error(`${e}`))
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

export default withRouter(Login)
