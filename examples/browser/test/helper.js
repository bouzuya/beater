const beater = require('beater').default;
const reporter = require('beater-html-reporter').default;

const { test } = beater(reporter());

module.exports = { test };
