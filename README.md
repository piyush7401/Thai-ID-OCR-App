# Thai ID OCR App 
This project utilizes the Google Cloud Vision API for optical character recognition (OCR) on Thai ID card images. It extracts key information such as identification numbers, names, and other relevant details.
## Features
- **Optical Character Recognition (OCR):** Utilizes the Google Cloud Vision API to extract information from Thai ID card images.
- **Data Modification:** Modify extracted data as needed.
- **Data Filtering:** Implement filters to narrow down specific information.
- **Data Deletion:** Delete certain ID card records from the system.
## Setup

1. **Google Cloud Vision API:**
   - Create a Google Cloud Platform (GCP) project.
   - Enable the Cloud Vision API and obtain API credentials.

2. **Backend Setup:**
   - Install Node.js and npm.
   - Install project dependencies: `npm install`.
   - Set up environment variables for API credentials.

3. **Frontend Setup:**
   - React is used for the frontend.
   - Install dependencies: `npm install`.
   - Start the development server: `npm start`.
## Usage

1. **Start the Backend Server:**
   ```bash
   npm run start

2. **Start the Frontend Development Server:**
   cd frontend
   npm start

3. **Open the App**
   Open the app in your browser (usually at http://localhost:3000)

## API Endpoints

1. **GET /ocr/all**
   Get all OCR records.

2. **GET /ocr/:id**
   Get a specific OCR record by ID.

3. **POST /ocr/create**
   Upload and process a new OCR record.

4. **PUT /ocr/:id**
   Update an existing OCR record.
   
6. **DELETE /ocr/:id**
   Delete an OCR record.

   
