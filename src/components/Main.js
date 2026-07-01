import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Map from './Map'
import Options from './Options'

const Main = () => (
  <main>
    <Routes>
      <Route path="/" element={<Map />} />
      <Route path="/options" element={<Options />} />
    </Routes>
  </main>
)

export default Main
