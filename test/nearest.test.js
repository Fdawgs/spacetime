import test from 'tape'
import spacetime from './lib/index.js'

test('nearest', (t) => {
  const s = spacetime('jan 2 2019', 'Canada/Eastern')
  const month = s.nearest('month')
  const year = s.nearest('year')
  const quarter = s.nearest('quarter')
  t.equal(month.format('iso'), year.format('iso'), 'nearest year=nearest month')
  t.equal(quarter.format('iso'), year.format('iso'), 'nearest quarter=nearest month')
  t.end()
})

test('nearest-time', (t) => {
  let s = spacetime('feb 20 2017', 'Canada/Pacific')
  s = s.time('3:29am')
  const hour = s.nearest('hour')
  t.equal(hour.format('time'), '3:00am', 'close-call nearest-hour')
  t.end()
})

test('nearest-quarter-hour', (t) => {
  let s = spacetime([2019, 4, 8, 10, 11, 12], 'Canada/Eastern')
  s = s.nearest('quarter-hour')
  t.equal(s.format('iso'), '2019-05-08T10:15:00.000-04:00', 'nearest-quarterhour')
  t.end()
})
