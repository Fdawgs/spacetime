/* eslint no-unused-vars: "off" */
import test from 'tape'
import spacetime from './lib/index.js'
import useOldTz from './lib/useOldTz.js'

test('clone still works', (t) => {
  const day0 = spacetime.now()
  const today = day0.format('nice')
  const day1 = day0.clone()
  t.ok(day0.format('nice') === day1.format('nice'), 'eq')
  t.ok(day0.format('nice') === day1.format('nice'), 'eq')
  //log this, if it ever happends. i saw it once.
  if (day0.format('nice') !== day1.format('nice')) {
    console.log(day0.format('nice'), day1.format('nice'))
  }
  t.end()
})

test('.add does not mutate', (t) => {
  t.plan(1)
  const day0 = spacetime.now()
  const today = day0.format('nice')
  const tmrw = day0.add(1, 'day').format('nice')
  t.ok(today === day0.format('nice'), '.add not mutated')
})

test('.subtract does not mutate', (t) => {
  t.plan(1)
  const day0 = spacetime.now()
  const today = day0.format('nice')
  const tmrw = day0.subtract(1, 'day').format('nice')
  t.ok(today === day0.format('nice'), '.subtract not mutated')
})

test('.hour does not mutate', (t) => {
  t.plan(1)
  const day0 = spacetime.now()
  const today = day0.format('nice')
  const tmrw = day0.hour(1).format('nice')
  t.ok(today === day0.format('nice'), '.hour not mutated')
})

test('.date does not mutate', (t) => {
  t.plan(1)
  const day0 = spacetime.now()
  const today = day0.format('nice')
  const tmrw = day0.date(1).month(1).year(2018).format('nice')
  t.ok(today === day0.format('nice'), '.date not mutated')
})

test('.day does not mutate', (t) => {
  t.plan(1)
  const day0 = spacetime.now()
  const today = day0.format('nice')
  const tmrw = day0.day(22).format('nice')
  t.ok(today === day0.format('nice'), '.day not mutated')
})

test('.month does not mutate', (t) => {
  t.plan(1)
  const day0 = spacetime.now()
  const today = day0.format('nice')
  const tmrw = day0.month(7).format('nice')
  t.ok(today === day0.format('nice'), '.month not mutated')
})

test('.quarter does not mutate', (t) => {
  t.plan(1)
  const day0 = spacetime.now()
  const today = day0.format('nice')
  const tmrw = day0.quarter(4).format('nice')
  t.ok(today === day0.format('nice'), '.quarter not mutated')
})

test('.goto does not mutate', (t) => {
  t.plan(1)
  const day0 = spacetime.now()
  const today = day0.format('nice')
  const tmrw = day0.goto('Australia/Brisbane').format('nice')
  t.ok(today === day0.format('nice'), '.goto not mutated')
})
test('time setting works', (t) => {
  t.equal(spacetime.now().time('6:00pm').time(), '6:00pm', 'input=output')
  t.end()
})

test('smoke-test all mutable methods', (t) => {
  const arr = [
    ['add', 3, 'days'],
    ['ampm', 'pm'],
    ['date', 12],
    ['day', 'thursday'],
    ['dayName', 'monday'],
    ['dayOfYear', 23],
    ['dayTime', 'evening'],
    ['era', 'bc'],
    ['hour', 4],
    ['hour12', '9am'],
    ['hourFloat', 2],
    ['millisecond', 234],
    ['minute', 3],
    ['month', 1],
    ['monthName', 'july'],
    ['quarter', 2],
    ['season', 'summer'],
    ['second', 23],
    ['subtract', 12, 'hours'],
    ['time', '4:24pm'],
    ['week', 4],
    ['year', 1982]
    // ['from',],
    // ['fromNow',],
    // ['i18n',],
  ]
  const epoch = 1552114800001
  arr.forEach((a) => {
    let d = spacetime(null, 'Canada/Pacific')
    d = useOldTz(d)
    const orig = d.set(1552114800001)
    const fn = a[0]
    const s = orig[fn](a[1], a[2])
    //make-sure original didn't change
    t.equal(orig.epoch, epoch, fn + ' - immutable didnt change')
    t.notEqual(orig.epoch, s.epoch, fn + ' - immutable result changed')
  })
  t.end()
})

test('boolean methods identical', (t) => {
  const r = spacetime(1552124200401)
  const r2 = spacetime(1552145200401)
  const arr = [
    ['isSame', r, 'day', true],
    ['isAfter', r, 'day', false],
    ['isBefore', r, 'day', true],
    ['isEqual', r, 'day', false],
    ['isBetween', r, r2, false]
  ]
  arr.forEach((a) => {
    const immut = spacetime(1552114800001)
    const fn = a[0]
    const one = immut[fn](a[1], a[2])
    t.equal(one, a[3], fn + ' equal')
  })
  t.end()
})
