import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import OptionsContext from '../../context/OptionsContext'

import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  CANVAS_COLOR,
  STATION_RADIUS,
  TUNNEL_WIDTH,
  TRAIN_RADIUS,
} from '../../config/canvas'

class MapCanvas extends PureComponent {
  static clear(ctx) {
    ctx.fillStyle = CANVAS_COLOR
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  }

  static drawMap(ctx, lines) {
    ctx.lineWidth = TUNNEL_WIDTH

    const transferStationsToDraw = []

    lines.forEach(({ color, stations }) => {
      ctx.fillStyle = color
      ctx.strokeStyle = color

      for (let i = 0; i < stations.length - 1; i += 1) {
        MapCanvas.drawLine(ctx, stations[i].position, stations[i + 1].position)
      }

      stations.forEach((station) => {
        const { position } = station
        if (station.isTransfer && !transferStationsToDraw.includes(station)) {
          transferStationsToDraw.push(station)
        } else if (!station.isTransfer) {
          MapCanvas.drawCircle(ctx, position)
        }
      })
    })

    transferStationsToDraw.forEach((station) => {
      MapCanvas.drawTransferStation(ctx, station)
    })
  }

  static drawCircle(ctx, position, radius = STATION_RADIUS) {
    ctx.beginPath()
    ctx.arc(...position, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  static drawTransferStation(ctx, station) {
    const lineColor = ctx.fillStyle

    ctx.fillStyle = CANVAS_COLOR
    ctx.strokeStyle = '#000'
    ctx.lineWidth = TUNNEL_WIDTH
    MapCanvas.drawCircle(ctx, station.position)
    ctx.stroke()
    ctx.fillStyle = lineColor
  }

  static drawLine(ctx, from, to) {
    ctx.beginPath()
    ctx.moveTo(...from)
    ctx.lineTo(...to)
    ctx.stroke()
  }

  static drawTrains(ctx, trains) {
    ctx.fillStyle = 'orange'
    trains.forEach((train) => {
      const { position } = train.currentStation
      MapCanvas.drawCircle(ctx, position, TRAIN_RADIUS)
    })
  }

  canvas = React.createRef()

  render() {
    const { lines, trains } = this.props
    const { options: { trainCapacity, trainInterval } } = this.context
    const { current: canvas } = this.canvas

    if (canvas) {
      const ctx = canvas.getContext('2d')

      MapCanvas.clear(ctx)
      MapCanvas.drawMap(ctx, lines)
      MapCanvas.drawTrains(ctx, trains)
    }

    return (
      <CanvasWrapper>
        <canvas ref={this.canvas} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
        <CanvasLabel>
          Train capacity:
          {trainCapacity}
          <br />
          Train interval:
          {trainInterval}
        </CanvasLabel>
      </CanvasWrapper>
    )
  }
}
MapCanvas.contextType = OptionsContext
export default MapCanvas

MapCanvas.propTypes = {
  lines: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      stations: PropTypes.array.isRequired,
    }),
  ),
  trains: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      line: PropTypes.object.isRequired,
      position: PropTypes.number.isRequired,
      direction: PropTypes.number.isRequired,
    }),
  ),
}

MapCanvas.defaultProps = {
  lines: [],
  trains: [],
}

const CanvasWrapper = styled.div`
  padding-top: 50px;
`

const CanvasLabel = styled.div`
  padding-top: 5px;
  font: 14px/1 ${(props) => props.theme.fontFamily.main};
`
