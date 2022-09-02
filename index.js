
'use strict';
const path = require('path');
const glob = require("glob");
let  zipdire  = './zip/created.zip';
var fs = require('fs');
var zipper = require('./zipper');

const Mocha = require('mocha');
const mocha = new Mocha(
{
  reporter: 'mochawesome',
  timeout: '20000',
  includeScreenshots:true,
  reporterOptions:
  {
    reportDir: './app-test-report/detailed-report/',
    reportFilename: 'test-summary-report',
    reportTitle: 'app-detailed-test-report'

  },
  screenshotsFolder:'./detailed-report/screenshots/'
});
const testDir = './test';
const testFiles = glob.sync('**/*.js',
{
  cwd: testDir
});
testFiles.forEach((file) => delete require.cache[file]);
testFiles.forEach((file) => mocha.addFile(path.join(testDir, file)));

mocha.run(() =>
  {
    console.log('Inside run method ');
    zipper.zipDirectory('./app-test-report',zipdire);

    console.log('OK');
  })
  .on('test', function (test)
  {
    console.log('Test started: ' + test.title);

  })
  .on('test end', function (test)
  {
    console.log('Test ended: ' + test.title);
  })
  .on('pass', function (test)
  {
    console.log('Test passed');
  })
  .on('fail', function (test, err)
  {
    console.log('Test failed');
    console.log(test);
    console.log(err);
  })
  .on('end', function (test)
  {
    console.log("Inside End")
 

  
  })