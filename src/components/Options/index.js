import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import OptionsContext from '../../context/OptionsContext'

import Layout from '../Layout'

import {
  TRAIN_CAPACITY_MIN,
  TRAIN_CAPACITY_MAX,
  TRAIN_INTERVAL_MIN,
  TRAIN_INTERVAL_MAX,
} from '../../config/trains'

function Options() {
  const { options: contextOptions, setOptions: setContextOptions } = useContext(OptionsContext)
  const [options, setOptions] = useState(contextOptions)

  const validateAndSave = (value, key) => {
    if (value) {
      setOptions({
        ...options,
        [key]: value,
      })
    }
  }
  return (
    <Layout>
      <>
        <OptionsRow>
          <OptionsInput
            type="number"
            min={TRAIN_CAPACITY_MIN}
            max={TRAIN_CAPACITY_MAX}
            value={options.trainCapacity}
            onChange={({ target: { value } }) => validateAndSave(Number(value), 'trainCapacity')}
          />
          <OptionsButton type="button" value="Save capacity" onClick={() => setContextOptions(options)} />
        </OptionsRow>
        <OptionsRow>
          <OptionsInput
            type="number"
            min={TRAIN_INTERVAL_MIN}
            max={TRAIN_INTERVAL_MAX}
            value={options.trainInterval}
            onChange={({ target: { value } }) => validateAndSave(Number(value), 'trainInterval')}
          />
          <OptionsButton type="button" value="Save interval" onClick={() => setContextOptions(options)} />
        </OptionsRow>
      </>
    </Layout>
  )
}

export default Options

const OptionsRow = styled.div`
  display: flex;
`

const OptionsInput = styled.input`
  display: block;
  font: 25px/1 ${(props) => props.theme.fontFamily.main};
  ${(props) => props.theme.mixins.input};
  border: 1px solid rgba(0,0,0,.5);
  padding: 8px;
  
`

const OptionsButton = styled(OptionsInput)`
  cursor: pointer;
  margin-left: 5px;
  border-radius: 8px;
`
