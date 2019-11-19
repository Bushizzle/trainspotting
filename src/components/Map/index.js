import React, { PureComponent } from 'react'

import Layout from '../Layout'
import MapCanvas from './MapCanvas'

import OptionsContext from '../../context/OptionsContext'
import {
  mapStations,
  mapLines,
  mapTrains,
  trainsCycle,
  checkForCrash,
} from '../../helpers/trainspotting'

class Map extends PureComponent {
  constructor() {
    super()
    this.state = {
      lines: [],
      trains: [],
      interval: null,
      timestamp: Date.now(),
    }
  }

  componentDidMount() {
    const {
      options: {
        trainInterval,
        trainCapacity,
      },
      data: {
        stations: stationsData,
        lines: linesData,
        trains: trainsData,
      },
    } = this.context

    const stations = mapStations(stationsData)
    const lines = mapLines(linesData, stations)
    const trains = mapTrains(trainsData, lines, trainCapacity)

    const interval = setInterval(() => {
      trainsCycle(trains)
      this.setState({
        timestamp: Date.now(),
      })
      checkForCrash(trains)
    }, trainInterval)

    this.setState({
      lines,
      trains,
      interval,
    })
  }

  componentWillUnmount() {
    const { interval } = this.state
    clearInterval(interval)
  }

  render() {
    const { lines, trains, timestamp } = this.state
    return (
      <Layout>
        <MapCanvas lines={lines} trains={trains} time={timestamp} />
      </Layout>
    )
  }
}

Map.contextType = OptionsContext

export default Map
