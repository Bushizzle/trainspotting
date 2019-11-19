class Train {
  onBrake = false

  onMove = false

  constructor(
    {
      id,
      position,
      direction,
      line: lineId,
    },
    lines,
    capacity,
  ) {
    Object.assign(this, {
      id,
      position,
      direction,
      line: lines.find((line) => line.id === lineId),
      payload: Math.ceil(Math.random() * capacity),
    })
  }

  setStatus(allTrains) {
    const others = allTrains.filter((train) => train.id !== this.id)

    // Blocking our way
    const onOurWay = others.find((train) => train.currentStation === this.nextStation)
    if (onOurWay && !onOurWay.onMove) {
      if (onOurWay.onBrake) this.onBrake = true
      return false
    }
    // Arrivring same station
    if (others
      .filter((train) => !train.onBrake && train.nextStation === this.nextStation)
      .some((train) => train.payload >= this.payload)
    ) {
      this.onBrake = true
      return false
    }

    this.onMove = true
  }

  get currentStation() {
    return this.line.stations[this.position]
  }

  get nextStation() {
    return this.line.stations[this.position + this.direction]
  }

  go() {
    const { stations } = this.line
    this.position += this.direction
    if (this.position === stations.length - 1 || !this.position) this.direction *= -1
  }

  reset() {
    this.onBrake = false
    this.onMove = false
  }
}

const noStateTrain = ({ onBrake, onMove }) => !onBrake && !onMove

export function trainsCycle(trains) {
  do {
    trains.filter(noStateTrain).forEach((train) => train.setStatus(trains))
  } while (trains.some(noStateTrain))
  trains.filter(({ onMove }) => onMove).forEach((train) => train.go())
  trains.forEach((train) => train.reset())
}

export function checkForCrash(trains) {
  if ((Array.from(new Set(trains.map((train) => train.currentStation.id)))).length !== trains.length) {
    console.warn('WARNING: WE HAVE A TRAIN ACCIDENT')
  }
}

class Station {
  constructor(station) {
    Object.assign(this, station)
  }
}

export const mapStations = (stations) => stations.map((station) => new Station(station))

export const mapLines = (lines, stations) => lines.map((line) => ({
  ...line,
  stations: line.stations.map((stationId) => stations.find((station) => station.id === stationId)),
}))

export const mapTrains = (trains, lines, capacity) => trains.map((train) => new Train(train, lines, capacity))
