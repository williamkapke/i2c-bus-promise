
// let's just keep it simple.
const busWrapper = (bus) => {
  // don't allow it to be wrapped more than once
  if (bus.wrapped && bus._bus) return bus

  return {
    wrapped: true,
    _bus: bus,
    close: () => new Promise((resolve, reject) =>
      bus.close(err =>
        err ? reject(err) : resolve()
      )
    ),

    i2cWrite: (addr, length, buffer) => new Promise((resolve, reject) => {
      bus.i2cWrite(addr, length, buffer, (err, bytesWritten, buffer) =>
        (err) ? reject(err) : resolve(buffer)
      )
    }),

    i2cRead: (addr, length, buffer = Buffer.alloc(length)) =>  new Promise((resolve, reject) => {
      bus.i2cRead(addr, length, buffer, (err, bytesRead, buffer) =>
        (err) ? reject(err) : resolve(buffer)
      )
    }),


    i2cFuncs: () => new Promise((resolve, reject) =>
      bus.i2cFuncs((err, funcs) =>
        err ? reject(err) : resolve(funcs)
      )
    ),

    scan: (...args) => new Promise((resolve, reject) =>
      bus.scan(...args, (err, devices) =>
        err ? reject(err) : resolve(devices)
      )
    ),

    deviceId: (addr) => new Promise((resolve, reject) =>
      bus.deviceId(addr, (err, id) =>
        err ? reject(err) : resolve(id)
      )
    ),

    readByte: (addr, cmd) => new Promise((resolve, reject) => bus.readByte(addr, cmd, (err, byte) =>
      err? reject(err) : resolve(byte)
    )),

    readWord: (addr, cmd) => new Promise((resolve, reject) => bus.readWord(addr, cmd, (err, word) =>
      err? reject(err) : resolve(word)
    )),

    readI2cBlock: (addr, cmd, length, buffer = Buffer.alloc(length)) => new Promise((resolve, reject) =>
      bus.readI2cBlock(addr, cmd, length, buffer, (err, bytesRead, buff) =>
        err ? reject(err) : resolve(buff)
      )
    ),

    receiveByte: (addr) => new Promise((resolve, reject) => bus.receiveByte(addr, (err, byte) =>
      err? reject(err) : resolve(byte)
    )),

    sendByte: (addr, byte) => new Promise((resolve, reject) => bus.sendByte(addr, byte, (err) =>
      err? reject(err) : resolve()
    )),

    writeByte: (addr, cmd, byte) => new Promise((resolve, reject) => bus.writeByte(addr, cmd, byte, (err) =>
      err? reject(err) : resolve()
    )),

    writeWord: (addr, cmd, word) => new Promise((resolve, reject) => bus.writeWord(addr, cmd, word, (err) =>
      err? reject(err) : resolve()
    )),

    writeQuick: (addr, bit) => new Promise((resolve, reject) => bus.writeQuick(addr, bit, (err) =>
      err? reject(err) : resolve()
    )),

    writeI2cBlock: (addr, cmd, buffer) => new Promise((resolve, reject) =>
      bus.writeI2cBlock(addr, cmd, buffer.length, buffer, (err, bytesWritten, buffer) =>
        err ? reject(err) : resolve(buffer)
      )
    )
  }
}


const i2c = {}

i2c.open = (...args) => new Promise((resolve, reject) => {
  const bus = require('i2c-bus').open(...args, (err) =>
    (err) ? reject(err) : resolve(busWrapper(bus))
  )
})

// allow BYO[i2c-bus]...
i2c.wrap = busWrapper;

module.exports = i2c;
