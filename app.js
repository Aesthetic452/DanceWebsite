const express=require("express");
const path=require("path");
const fs = require("fs");
const app= express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port=80;

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

var Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {};
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {};
    res.status(200).render('contact.pug', params);
})
app.get('/location', (req, res)=>{
    const params = {};
    res.status(200).render('location.pug', params);
})

app.post('/contact', async (req, res)=>{
    var myData = new Contact(req.body);
    // console.log(myData);
    try {
        await myData.save()
        res.send('Saved')
    } catch (e) {
        console.log(e)
        res.send('Not saved')
    }
})

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

// app.post('/contact', (req, res)=>{
//     var myData = new Contact(req.body);
//     console.log(myData);
//     myData.save().then(()=>{
//         res.send('This item has been saved to the database')
//     }).catch((e)=>{
//         console.log(e);
//         res.status(400).send('item was not saved to the database')
//     });
// })