const archiver = require('archiver');
var fs = require('fs');
var zipper = require('./zipper');
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var myBucket = 'app-bucket-unique';
let  zipdire  = './zip/created.zip';


var myKey = '1.html';
/**
 * @param {String} sourceDir: /some/folder/to/compress
 * @param {String} outPath: /path/to/created.zip
 * @returns {Promise}
 */
exports.zipDirectory =function (sourceDir ,outPath) {
  const archive = archiver('zip', { zlib: { level: 9 }});
  const stream = fs.createWriteStream(outPath);

  return new Promise((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on('error', err => reject(err))
      .pipe(stream)
    ;

    stream.on('close', () => resolve());

    archive.finalize();
    s3upload();
  });
}

function s3upload()
{
  console.log(`Hekkkkk kkkkkkkkk`);
  fs.readFileSync('./zip/1.txt', function (err, data)
  {
    if (err)
    {
      throw err;
    }
    params = { Bucket: myBucket, Key: myKey,Body: data};
  
    console.log('Inside run method '+params.data);
   s3.putObject(params).promise()
   .then(data => { console.log('done', data); })
   .catch(err => { console.log('error', err); });

  })
}

