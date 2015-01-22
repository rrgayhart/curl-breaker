#! /usr/bin/env node

var _ = require('lodash');
var colors = require('colors');

var curlBreaker = function(){
  var command = process.argv.slice(2).join(' ');
  console.log("\nCurl Breaker".rainbow.bold + " Speaks....\n");
  if (command){
    headerMonster(command);
    cookieMonster(command);
    dataMonster(command);
  }else{
    console.log('Make sure to add a CURL command to your call!'.magenta);
  }
};

var headerMonster = function(command){
  var headerMatcher = /-H (.*?) --/;
  var headerBlock = headerMatcher.exec(command);
  if(headerBlock){
    var splitOnHeaders = headerBlock[1].split(' -H ');
    console.log(["There Are", splitOnHeaders.length, "Headers\n"].join(' ').cyan.underline);
    _(splitOnHeaders).forEach(function(header) { console.log(header); });
  }else{
    console.log('No headers found. Are you sure this is a curl command?'.red);
  }
};

var cookieMonster = function(command){
  var cookiesMatcher = /(cookie: )(.*?)(' | -H)/i;
  var splitOnCookie = cookiesMatcher.exec(command);
  if (splitOnCookie){
    var splitCookies = splitOnCookie[2].split('; ');
    console.log(["\nThere Are", splitCookies.length, "Cookies Being Passed\n"].join(' ').magenta.underline);
    _(splitCookies).forEach(function(cookie) { console.log(cookie); });
  }
};

var dataMonster = function(command){
  var dataMatcher = /(--data )(.*?) -/i;
  var splitOnData = dataMatcher.exec(command);
  if (splitOnData) {
    console.log("\nYou're Passing This Data\n".green.underline);
    console.log(splitOnData[2]);
  }
};

module.exports = curlBreaker();
