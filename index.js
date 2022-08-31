const http = require('http');
'use strict';
const path = require('path');
const glob = require("glob");

var fs = require('fs');


var AWS = require('aws-sdk');
var s3 = new AWS.S3();
 
let htmldirname = './myReport/TestSummaryReport.html';
let dirname = './myReport/TestSummaryReport.json';

var myBucket = 'general-bucket56';

var myKey = 'html';

const Mocha = require('mocha');
const mocha = new Mocha(
{
  reporter: 'mochawesome',
  timeout: '20000',
  reporterOptions:
  {
    reportDir: './myReport',
    reportFilename: 'TestSummaryReport'

  }
});
const testDir = './Tests';
const testFiles = glob.sync('**/*.js',
{
  cwd: testDir
});
testFiles.forEach((file) => delete require.cache[file]);
testFiles.forEach((file) => mocha.addFile(path.join(testDir, file)));

mocha.run(() =>
  {
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
   if (fs.existsSync(htmldirname)) 
   {
      const fileContent = fs.readFileSync(htmldirname);
      params = { Bucket: myBucket, Key: 'html',Body: fileContent};
        s3.putObject(params, function (err, data)
      {
        if (err) { console.log(err)}
        else { console.log("Successfully uploaded data to general-bucket56/myKey");}
      });
   }
  
  });