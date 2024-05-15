//serverfail
//käsud: npm init, npm i express (ühendused, andmevahetus, rakenduste käima panek)
//ejs (süsib anmeid htmli ja saada htmli serverile) axios (botconi serveri päringud)
//npm start ctrl+c
const express = require('express'); //1 lingid paketidele
const Wish = require('./model/wish');
const app = express(); //2 initsialiseerib äpi

app.set('view engine', 'ejs'); //4 et andmeid htmli süstida
app.use(express.urlencoded({ extended: true })); //5 et lehe vormist andmeid kätte saada
app.use(express.static('public'));//6 et anda luba CSS faili asukoha kasutamiseks

app.get('/', (req, res) => {//7 õpetame urli get päringud selgeks (localhost:5000) (reg/res-muutujad)
  Wish.fetchAllWishes(wishesFromFile => {
    console.log(wishesFromFile);
    res.render('index', {myWishes: wishesFromFile});//7saadab vastu index faili
  });
  
});

app.post('/wish', (req, res) => {
  let userData = req.body.userWish;

  let newWish = new Wish(userData);
  newWish.saveWish();
  res.redirect('/');
});




let port = 5000; //3 rakendus ootama päringuid
app.listen(port, () => {  //3
  console.log(`Server is running ${port}`);
});

