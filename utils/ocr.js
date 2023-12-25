const vision = require('@google-cloud/vision');


const CREDENTIALS = {
    "type": "service_account",
    "project_id": "pivotal-nebula-409213",
    "private_key_id": "26ecd1044f82b4fc9eead3c2b12533995fb09e59",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDWE/0z7NK4IV+9\nxMWRDgTZJxgLYFzr71c9/utKtyWa8IZtxA5PYgDjEuojNAm8wZa2bMTkmx+K9Zcf\nNgb16BVYBsvYt42gRLPSjgnQsatGl+1AnOh21OI/numA87GjLW8ZhgleWCPmUCXa\nYwGfU2F43uB9OOQmEoV8NIBXz5IWxd5s+ffQD+NFcBaJNZkv/p4bWG+cXYsoqiei\nrXqW+Gwz/+9SW8eTQDzlIgtHmbw3HVQPRqO/Fxqt4A35cgISuf5qCyKkNCAJTKBW\nra2xvda71n/PGN1YiRXKXjO8Y6Vi6uBGw3Az6W7FWvwuOiV3J2qFTTi9QwlvydV5\nieYMw7x9AgMBAAECggEAM87QGOQgBcwb27TWXDmgjj3yCXTHYBjCy//YiPMkQGgj\nnEZVcTwmO03tSFo0XhAajWjqyGlLG6m+KiE803+YRL6WUArx1R6zRwo1UWJh8Rpc\n4iVm87Um0N9AIsM3Euawq6ReuYyKmZb9ZinOL3TyEpqbiOp++kDCubGJ+tZCxEwq\nmPIVS+I/WiEtQ5JCDhqWJ9NAJRJxwrSk2B0D9A1j2KZFRcId4IZ/ygdeuRW5hOSY\nZGlyls03Jc6vRLCAT6e0EaqG87hnItdISorPJ3odOKlDMsiy8HwDuf9E0dPWr+g9\nmskHdlhtm0OV6e5y40nEOwKov+FEgIZLIeK14Z+fuQKBgQDzNBK89JNgzIS4BUwN\n+E3qXoMVif08AoMUaQNU9OC/yKH7vLWc1B3gGScUtX1sOCcRIj7AhTJ6dsueLu1a\ndEgw15yqs/cKYwqcC9LCrg111WTzwByhIwjT0dpgnjE7fAQDmHXeJeqbGQgjm7d0\nrwiFGkIIMekwlfC8yvLXCm0keQKBgQDhV5m4lowqqMj3ZxaSMlt+Y5qBn8QG3gc4\nVlhri/c5RN1l3cTO9nF8Co90xQ1onPKynxKMd+flLE/93KwkxxEu+xu3QGB76zal\nuJ/SneIrlQIuPgvFdPKqZQfkpUAAB3/rL+m12W0O9LNh4BL9ZBzaoamb8h/VkdOE\nZVxo/FVvJQKBgE2mubjlKk1E37dV0aPAPThwts/gwB8x+iJBKVQt37i8WaPj6+TI\nAUX1IfpFvGcaQrcAxSJ5JNXfKkI2X4h7CjW2Egqa7Wy+lLugNsn8AsY1vUbqdvmo\nEwB2x5AD0lpYzXtMaY3lc1PUGTotVNUHseO1r5GoRflCVpwg/IpWhOSZAoGBAImN\nlLtVwqgDsfE7j06cyLblDBqWMO3UOGoOYxj7LmVaAR++ePWw/+Ms+xbXdnDmZUvd\nyE/QndCJ9SZMvxQQJBAennOFK6BZG1mb0ouZbscVxWf+3eahlcOnumK68M9TxKUG\n8U3dNDJN8vYK9uyQYQCgcE1ORlpzEr+dtAQuC+S1AoGBALzYEcrP/4yhSQS5We0E\nkKf0S+Zq6EUIB8nTrFdoXONzczjfAlZrygVQNJo1VoZmEj9H6FcH9nmOh2vlADH8\nc5lYkoEDt6uOAzsBrJMp6XiurMGQL4tv8T9bAjvWkaGNrKDLjkKq1KwK0Ofp+PyC\nJr5unkNueLrcKJ3jYJ+zFZYk\n-----END PRIVATE KEY-----\n",
    "client_email": "piyush-varshney@pivotal-nebula-409213.iam.gserviceaccount.com",
    "client_id": "114435204512372531687",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/piyush-varshney%40pivotal-nebula-409213.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  };
  
const client = new vision.ImageAnnotatorClient({
  credentials: {
    private_key: CREDENTIALS.private_key,
    client_email: CREDENTIALS.client_email,
  },
});

const detectThaiIDInfo = async (file_path) => {
    try {
      const [result] = await client.textDetection(file_path);
      const fullText = result.fullTextAnnotation.text;

      console.log('OCR Text:', fullText);

      const identificationNumberRegex = /\d{1} \d{4} \d{5} \d{2} \d{1}/;
      const nameRegex = /Name(?:\n| )(.+)/;
      const lastNameRegex = /Last name(?:\n| )(.+)/;
      const dobRegex = /(?:Date of Birth|เกิดวันที่)(?:\n| )(\d{1,2} [A-Za-z]+(?:[.] \d{4})?)/;
      const issueDateRegex = /(?:Date of Issue|วันออกบัตร)(?:\n| )(.+)/;
      const expiryDateRegex = /(?:Date of Expiry|วันบัตรหมดอายุ)(?:\n| )(.+)/;

      const identificationNumberMatch = fullText.match(identificationNumberRegex);
      const nameMatch = fullText.match(nameRegex);
      const lastNameMatch = fullText.match(lastNameRegex);
      const dobMatch = fullText.match(dobRegex);
      const issueDateMatch = fullText.match(issueDateRegex);
      const expiryDateMatch = fullText.match(expiryDateRegex);

      const identificationNumber = identificationNumberMatch ? identificationNumberMatch[0] : null;
      const name = nameMatch ? nameMatch[1] : null;
      const lastName = lastNameMatch ? lastNameMatch[1] : null;
      const dateOfBirth = dobMatch ? dobMatch[1] : null;
      const dateOfIssue = issueDateMatch ? issueDateMatch[1] : null;
      const dateOfExpiry = expiryDateMatch ? expiryDateMatch[1] : null;

      const output = {
        identification_number: identificationNumber,
        name: name,
        last_name: lastName,
        date_of_birth: dateOfBirth,
        date_of_issue: dateOfIssue,
        date_of_expiry: dateOfExpiry,
      };

      console.log('Output:', output);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

//   detectThaiIDInfo('C:\\Users\\Dell\\Desktop\\New folder\\Thai.jpeg');

module.exports = {detectThaiIDInfo}