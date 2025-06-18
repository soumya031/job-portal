import multer from 'multer';

const storage = multer.memoryStorage(); // Store files in memory for further processing
export const singleUpload = multer({ storage }).single('file'); // For handling single file uploads (like resume)
