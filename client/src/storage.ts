import { Request, ParamsDictionary, Response } from 'express-serve-static-core';
import multer from 'multer';
import path from 'path';
import { ParsedQs } from 'qs';
import { db } from '~/data/db'; // your Prisma client

// Configure Multer for storing images locally
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), 'public/uploads')); // Store images in the public/uploads directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});

// Multer middleware for handling file uploads
const upload = multer({ storage: storage });

// API route handler (assuming you have an API route in Next.js)
export const handleImageUpload = async (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>) => {
    upload.array('images')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error uploading images' });
        }

        const { listingId } = req.body;

        // Loop through the uploaded files and save each one in the database
        if (!req.files) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const files = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();

        for (const file of files) {
            const imageUrl = `/uploads/${file.filename}`; // Local file path

             await db.listingImage.create({
                data: {
                    url: imageUrl,
                    listingId: listingId,
                },
            });
        }

        return res.status(200).json({ message: 'Images uploaded successfully' });
    });
};
