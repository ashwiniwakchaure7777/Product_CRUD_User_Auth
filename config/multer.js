import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import cloudinary from "cloudinary";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'D:\All Repos\product-backend1\Data', // Replace with your desired folder name
        allowed_formats: ['jpg', 'jpeg', 'png'],
    },
 });
 
 const upload = multer({ storage });

 export default upload;