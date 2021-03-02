const aws = require('aws-sdk');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

const deleteFromStorage = (key) => {
  // check if key is a url
  const isUrl = /https:\/\/.+/.test(key);
  if (isUrl) {
    // if key is a url extract just the key from the url
    key = key.match(/https:\/\/.+\/(.+)/)[1];
  }
  s3.deleteObject(
    {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key
    },
    () => {}
  );
};

module.exports = { s3, deleteFromStorage };
