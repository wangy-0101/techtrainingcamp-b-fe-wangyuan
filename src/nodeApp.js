const React = require('react')

module.exports = function nodeApp() {
  return React.createElement('div', {},
    React.createElement('h1', {}, 'Hello'))
}