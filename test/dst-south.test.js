import test from 'tape'
import spacetime from './lib/index.js'
import dstParse from './lib/dstParse.js'
// some northern hemisphere zones with dst changes
const zones = [
  'australia/act',
  'australia/adelaide',
  'australia/broken_hill',
  'chile/continental', //04/04:24
  // 'chile/easterisland',
]

test('south-increment-march', (t) => {
  zones.forEach((tz) => {
    // get fall dst change
    const dstStr = spacetime().timezones[tz].dst
    const change = dstParse(dstStr, 1)
    //create a date 2mins after dst change
    let before = spacetime(change, tz).minus(1, 'hour')
    // create a time 2hrs before a dst change (-2hrs)
    const after = before.clone().add(2, 'hours')
    // start rolling towards the dst shift (but don't hit it)
    for (let i = 0; i < 12; i += 1) {
      const time = before.time()
      t.equal(before.isBefore(after), true, time + ' before-change ' + tz)
      t.equal(before.timezone().current.isDST, false, time + ' dst-off ' + tz)
      before = before.add(10, 'minutes')
    }
    for (let i = 0; i < 14; i += 1) {
      const time = before.time()
      t.equal(before.timezone().current.isDST, true, time + ' dst-now-on ' + tz)
      before = before.add(10, 'minutes')
    }
  })
  t.end()
})

test('south-increment-nov', (t) => {
  zones.forEach((tz) => {
    // get fall dst change
    const dstStr = spacetime().timezones[tz].dst
    const change = dstParse(dstStr, 0)
    //create a date 2mins after dst change
    const after = spacetime(change, tz)
    // create a time 2hrs before a dst change (-3hrs)
    let before = after.clone().minus(3, 'hours')
    // start rolling towards the dst shift (but don't hit it)
    for (let i = 0; i < 12; i += 1) {
      const time = before.time()
      t.equal(before.isBefore(after), true, time + ' before-change ' + tz)
      t.equal(before.timezone().current.isDST, true, time + ' dst-on ' + tz)
      before = before.add(10, 'minutes')
    }
    for (let i = 0; i < 14; i += 1) {
      const time = before.time()
      t.equal(before.timezone().current.isDST, false, time + ' dst-now-off ' + tz)
      before = before.add(10, 'minutes')
    }
  })
  t.end()
})
