import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
import sharp from 'sharp'
import ApiError from './error.util.js'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})

const uploadOnCloudinary = async (file) => {
    try {
        if (!file) return null
        if (Buffer.isBuffer(file)) {
            const optimizedImageBuffer = await sharp(file)
                .resize(1200, 1200, {
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .jpeg({ quality: 80 })
                .toBuffer()
            const base64Image = optimizedImageBuffer.toString('base64')
            const imageName = 'optimized_image'

            if (imageName.length > 50) {
                throw new Error('Image name is too long')
            }

            const response = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Image}`, {
                public_id: imageName,
                resource_type: 'auto',
                quality: 'auto:low',
                fetch_format: 'auto',
                flags: 'lossy',
                eager_async: true
            })
            return response
        }

        const response = await cloudinary.uploader.upload(file, {
            resource_type: 'auto',
            quality: 'auto:low',
            fetch_format: 'auto',
            flags: 'lossy',
            eager_async: true
        })

        return response
    } catch (error) {
        console.error('Error uploading to cloudinary:', error)

        return null
    }
}

export const uploadBase64 = async (localFilePath) => {
    try {
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'image',
            chunk_size: 6000000,
            timeout: 600000
        })

        return response.secure_url
    } catch (error) {
        return null
    }
}

const deleteCloudinaryImage = async (imageId) => {
    try {
        const destroyImage = await cloudinary.uploader.destroy(imageId)

        if (destroyImage.result === 'ok') {
            console.log('Image deleted successfully....')
        } else {
            console.log('Error occur while deleting the image')
        }

        return destroyImage
    } catch (error) {
        console.log(error)
        throw new ApiError(400, 'Error occur while deleting the image')
    }
}

const handleImageUpload = async (image) => {
    return image ? await uploadBase64(image) : null
}
export { deleteCloudinaryImage, handleImageUpload, uploadOnCloudinary }

