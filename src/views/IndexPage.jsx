import React from 'react'
import {
  Button,
  message as messager
} from 'antd'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { mobius } from '../utils/mobius'
import { purgeCreds } from '../utils/credUtil'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: 'loading' }

    this.onLogout = this.onLogout.bind(this)
    this.onReload = this.onReload.bind(this)
  }

  componentDidMount() {
    const self = this
    const impl = async () => {
      const { success, message, result } = await mobius.get('/api/info').priv(true).do()
      if (!success) {
        messager.error(message)
      }
      self.setState({ text: result })
    }
    impl().then(() => {}).catch(e => messager.error(`${e}`))
  }

  onReload() {
    const self = this
    const impl = async () => {
      const { success, message, result } = await mobius.get('/api/info2').priv(true).do()
      if (!success) {
        messager.error(message)
      }
      self.setState({ text: result })
    }
    impl().then(() => {}).catch(e => messager.error(`${e}`))
  }

  onLogout() {
    purgeCreds()
    this.props.history.replace('/login')
  }

  render() {
    return (
      <>
        <div>{ this.state.text }</div>
        <Button onClick={this.onReload}>Reload</Button>
        <Button onClick={this.onLogout}>Logout</Button>
      </>
    )
  }
}

Index.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(Index)
