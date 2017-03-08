/* eslint-disable */
'use strict';

var extend = require('xtend');

var Blockly = require('./lib/blockly_compressed');

Blockly.Msg = extend(require('./lib/i18n/en'), Blockly.Msg);
Blockly.Msg = Blockly.Msg();

Blockly.Blocks = extend(Blockly.Blocks, require('./lib/blocks_compressed')(Blockly));

module.exports = Blockly;