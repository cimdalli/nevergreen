var successRepository = require('../storage/successRepository')
var _ = require('lodash')

function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

module.exports = {
    randomMessage: function () {
        return randomFrom(successRepository.getSuccessMessages()) || ''
    },

    isUrl: function (value) {
        return _.startsWith(value, 'http')
    }
}
