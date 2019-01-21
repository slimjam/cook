var config = require('../config');
var path = require('path');
var i18n_module = require('i18n-nodejs');
//var i18n = new i18n_module("ru", /*config.get("langFile")*/ path.join(__dirname, 'lang.json'));   //lang in usr

module.exports = function (lang="ru"){
    return new i18n_module(lang, path.join(__dirname, 'lang.json'));   //lang in usr
};
//module.exports = i18n;