# i2c-bus-promise
Nothing complicated here. Just a promise wrapper for [i2c-bus](https://www.npmjs.com/package/i2c-bus).

[i2c-bus](https://www.npmjs.com/package/i2c-bus) dependency defined as `^4` to allow wide compatibility with existing version you may have installed already.

## Install
```
npm install i2c-bus-promise
```

## Use
```js
const i2c = require('i2c-bus-promise');

i2c.open(1).then(async bus => {
  console.log(await bus.scan())
})
```


## BYO[i2c-bus]
If you already have an [i2c-bus](https://www.npmjs.com/package/i2c-bus) `bus` instance, you can just wrap it...

```js
const i2c = require('i2c-bus');
const wrap = require('i2c-bus-promise').wrap;

const bus = wrap(i2c.open(1, async (err) => {
  if (err) throw err

  console.log(await bus.scan())
}))
```
# License
MIT
