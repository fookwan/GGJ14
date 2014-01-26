var storage = require('./aws')[process.env.NODE_ENV || 'development']

module.exports = {
    variants: {
        user: {
            resizeAndCrop: {
                avatar: {resize: '300x300', crop: '200x200'},
                avatar_thumbnail: { resize: '100x100', crop: '75x75' }
            }
        }
    },

    storage: {
        S3: {
            key: storage.key,
            secret: storage.secret,
            bucket: storage.bucket
        },
        uploadDirectory: 'images/uploads/avatar/'
    }
}