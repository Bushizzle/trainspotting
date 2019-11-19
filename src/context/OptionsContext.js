import React, { Component, createContext } from 'react'
import PropTypes from 'prop-types'
import 'unfetch/polyfill'
import { setCookie, getCookie } from '../helpers'
import {
  TRAIN_OPTIONS_COOKIE_NAME,
  TRAIN_CAPACITY_DEFAULT,
  TRAIN_INTERVAL_DEFAULT,
} from '../config/trains'

const DEFAULT_OPTIONS = {
  trainCapacity: TRAIN_CAPACITY_DEFAULT,
  trainInterval: TRAIN_INTERVAL_DEFAULT,
}

const OptionsContext = createContext(DEFAULT_OPTIONS)

export class OptionsProviderComponent extends Component {
  constructor() {
    super()
    this.state = {
      data: null,
      options: DEFAULT_OPTIONS,
      setOptions: (options) => {
        setCookie(TRAIN_OPTIONS_COOKIE_NAME, JSON.stringify(options))
        this.setState({
          options,
        })
      },
    }
  }

  async componentDidMount() {
    const response = await fetch('/data.json')
    const data = await response.json()

    this.setState({
      data,
    })

    const cookieOptions = getCookie(TRAIN_OPTIONS_COOKIE_NAME)
    if (cookieOptions) {
      this.setState({
        options: JSON.parse(cookieOptions),
      })
    }
  }

  render() {
    const { data, options, setOptions } = this.state
    const { children } = this.props
    return (
      data
      && (
        <OptionsContext.Provider value={{ data, options, setOptions }}>
          {children}
        </OptionsContext.Provider>
      )
    )
  }
}

OptionsProviderComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
}

export default OptionsContext
