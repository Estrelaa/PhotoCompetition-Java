'use strict';
// JavaScript containing shared constants, for use in all pages.

var backendIp = '34.248.103.39';
var token = '5e7f6416-786a-430a-83fc-90acd7f5b3b2';

function buildUrl(path) {
    return 'http://' + backendIp + '/images' + path + '?token=' + token;
}
