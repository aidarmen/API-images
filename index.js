const express = require('express')
const multer = require('multer')
const ejs = require('ejs')
const path = require('path')
const randomstring = require('randomstring')

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
}).single('image')


const app = new express()
app.set('port', process.env.PORT || 8000)

app.set('view engine', 'ejs')

app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {

            res.send({

                url: `http://localhost:8000/uploads/${req.file.filename}`
            });


        }

    })
})

app.get('./upload', )




app.listen(app.get('port'), function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info('Web server is listening on port %s', app.get('port'))
    }
})