authCloudExplicit();

function authCloudExplicit () {
  // [START auth_cloud_explicit]
  // Imports the Google Cloud client library.
  const Storage = require('@google-cloud/storage');

  // Instantiates a client. Explicitly use service account credentials by
  // specifying the private key file. All clients in google-cloud-node have this
  // helper, see https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
  const storage = new Storage({
    keyFilename: '../../acumind-94a78470f74f.json'
  });

  // Makes an authenticated API request.
  storage
    .getBuckets()
    .then((results) => {
      const buckets = results[0];

      console.log('Buckets:');
      buckets.forEach((bucket) => {
        console.log(bucket.name);
      });
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
  // [END auth_cloud_explicit]
}

