import React from 'react'
import { Button } from 'react-native'
import styled from 'styled-components/native'
import { storiesOf } from '@storybook/react-native'
import { Notification } from '.'
import { Colors } from '../../Themes'

class WrapperComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      id: 0,
      text: '',
      type: Notification.types.success,
      persist: false
    }

    this.display = this.display.bind(this)
  }

  display (text, type, persist = false) {
    this.setState({
      id: this.state.id + 1,
      text,
      type,
      persist
    })
  }

  render () {
    return (
      <React.Fragment>
        <Button title='Display success notification'
          color={Colors.green}
          onPress={() => this.display('Tout va bien', Notification.types.success)} />
        <Button
          title='Display danger notification'
          color={Colors.red}
          onPress={() => this.display('Attention ça va très mal', Notification.types.danger)} />
        <Button
          title='Display long text notification'
          onPress={() => this.display('Attention quelque chose de très grand est dans cette notification ! Vraiment très très grand !', Notification.types.success)} />
        <Button
          title='Display persistant notification'
          onPress={() => this.display('Vous allez voir cette notification un bon moment', Notification.types.success, true)} />
        <Notification {...this.state} />
      </React.Fragment>
    )
  }
}

storiesOf('Containers/Notification', module)
  .add('Default', () => <Wrapper text='Tout va bien' type={Notification.types.success} />)

const Wrapper = styled(WrapperComponent)`
  flex: 1;
`
