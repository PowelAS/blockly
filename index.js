/* eslint-disable */
'use strict';

var extend = require('xtend');

var Blockly = require('./lib/blockly_compressed');

Blockly.Msg = extend(Blockly.Msg, require('./lib/i18n/en')());

Blockly.Blocks = extend(Blockly.Blocks, require('./lib/blocks_compressed')(Blockly));

module.exports = Blockly;
