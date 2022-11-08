var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', (req, res, next) => {
  User.find({}, (error, data)=>{
    console.log('Danh sach user', data);
    res.render('index', {users: data});
  });
});

// form_add
router.get('/form_add', (req, res, next) => {
  res.render('form_add');
});

router.post('/add',(req, res, next) => {
  User.create(req.body);
  res.redirect('/');
});

// form_update
router.get('/form_update/:id', (req, res, next) => {
  User.findById(req.params.id, (error, data)=> {
    res.render('form_update', {user: data});
  });
});

router.post('/update', (req, res, next) => {
  User.findByIdAndUpdate(req.body.id, req.body, (error, data)=>{
    res.redirect('/');
  });
});

// form_delete
router.get('/form_delete/:id', (req, res, next) => {
  User.findByIdAndDelete(req.params.id, (error, data)=> {
    res.redirect('/');
  });
});

//CONECTING DB// APP CONFI
mongoose.connect('mongodb+srv://Khoa21donga:Khoa21dongaKhoa21dongaKhoa21donga@cluster0.o9ivn6p.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useFindAndModify: false
  });

//SCHEMA
let UserSchema = mongoose.Schema({
  enablefcm: {
    type: String,
  },
  avatar: {
    type: String,
  },
  banner: {
    type: String,
  },
  fullname: {
    type: String,
  },
  typeuser: {
    type: String,
  },
  idprovince: {
    type: String,
  }
});

let User = mongoose.model('User', UserSchema);

module.exports = router;
