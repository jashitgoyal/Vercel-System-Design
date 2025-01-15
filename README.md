# Vercel System Design Project

_A scalable and modular system for managing file uploads, processing, and deployment using modern tools and technologies._

---

## 🚀 **Project Overview**

This project demonstrates the architecture and implementation of a scalable file upload and deployment system. Designed with TypeScript, Express.js, AWS S3, Redis, and other modern tools, the system efficiently handles user-uploaded repositories and processes them for deployment.

### **Features**

- **Upload Service**: Allows users to upload Git repositories via a URL.
- **Redis Queue**: Manages tasks efficiently for asynchronous processing.
- **AWS Integration**: Uploads and downloads files from AWS S3 storage.
- **Deployment Service**: Processes files and deploys static content.
- **Status Tracking**: Real-time status updates for upload and deployment tasks.

---

## 🛠️ **Tech Stack**

### **Languages & Frameworks**

- **TypeScript**: Type-safe and scalable development.
- **Node.js & Express**: Backend application framework.

### **Tools & Services**

- **AWS S3**: For storing and retrieving files.
- **Redis**: Task queue management and status tracking.
- **Simple-Git**: For cloning repositories.

---

## 📂 **Folder Structure**

```plaintext
vercel-system-design/
├── vercel-upload-service/         # Handles file uploads and repo cloning
├── vercel-deploy-service         # Processes uploaded files and deploys
├── vercel-request-handler        # Handling request
├── .gitignore             # Git ignore rules
├── README.md              # Project documentation
└── ...
```

---

## 🔧 **Setup Instructions**

### Prerequisites

- **Node.js** (>= 16.x)
- **Redis** (local or cloud-hosted)
- **AWS Account** (for S3)

### Environment Variables

Create a `.env` file in each service folder with the following keys:

```plaintext
AWS_ACCESS_KEY=your-access-key
AWS_SECRET_KEY=your-secret-key
AWS_BUCKET_NAME=your-bucket-name
```

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jashitgoyal/vercel-system-design.git
   cd vercel-system-design
   ```

2. Install dependencies for each service:

   ```bash
   cd ./vercel-upload-service
   npm install
   cd ./vercel-deploy-service
   npm install
   cd ./vercel-request-handler
   npm install

   ```

3. Start Redis locally or configure a cloud-hosted Redis instance.

4. Run services:
   ```bash
   cd ./vercel-upload-service
   node dist/index
   cd ./vercel-deploy-service
   node dist/index
   cd ./vercel-request-handler
   node dist/index
   ```

---

## 🖥️ **Endpoints**

### **Upload Service**

#### `POST /upload`

- **Description**: Accepts a repository URL and processes it.
- **Payload**:
  ```json
  {
    "repoUrl": "https://github.com/user/repository.git"
  }
  ```
- **Response**:
  ```json
  {
    "uploadId": "12345",
    "status": "uploaded"
  }
  ```

#### `GET /status/:uploadId`

- **Description**: Checks the status of an upload.
- **Response**:
  ```json
  {
    "uploadId": "12345",
    "status": "processing"
  }
  ```

### **Deploy Service**

- Automatically processes files from the Redis queue and updates the status.

---

## 🧪 **Testing**

Run unit tests using:

```bash
npm test
```

Ensure Redis and other dependencies are running before testing.

---

## 🌟 **Features to Add**

- Frontend interface for user interactions.
- Enhanced error handling and retries.
- Real-time notifications for status updates.

---

## 🤝 **Contributing**

Contributions are welcome! Feel free to submit a pull request or open an issue for suggestions or bugs.

---

## 📜 **License**

This project is licensed under the [MIT License](LICENSE).

---

## 📝 **Author**

**Jashit Goyal**  
_Connect with me on [LinkedIn](https://www.linkedin.com/in/jashitgoyal) or check out my [GitHub](https://github.com/jashitgoyal) for more projects._
