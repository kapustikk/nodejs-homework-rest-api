const multer  = require('multer')
const path = require('path')
require('dotenv').config()
const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, UPLOAD_DIR)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage, limits: { fileSize: 2000000 },
     fileFilter: (req, file, cb) => {

        // Функция должна вызывать `cb` с булевым значением,
        // которое показывает, следует ли принять файл
      if (file.mimetype.includes('image')) {
       // Чтобы отклонить, прокиньте в аргументы `false` так:
        cb(null, true)
        return
      }
         // Чтобы принять файл, используется как аргумент `true` таким образом:
        cb(null, false)
      },
     })
  
  module.exports = upload