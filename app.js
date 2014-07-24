var Flatsheet = require('flatsheet');
var Handlebars = require('handlebars');
var eve = require('dom-events');
var elClass = require('element-class');
var Leaflet = require('leaflet');
var domify = require('domify');
var fs = require('fs');

var fastClick = require('fastclick');
fastClick(document.body);

var flatsheet = new Flatsheet();

/* pull in template for showing info about a location */
var spaceTemplate = Handlebars.compile(fs.readFileSync('templates/space.html', 'utf8'));

/* set image path */
L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';

/* get the elements we'll be working with */
var list = document.getElementById('list-content');
var about = document.getElementById('about-content');
var nav = document.getElementById('top-nav');
var cards = document.querySelectorAll('.card');

flatsheet.sheet('zbckvrzp4ga27k0frnlhjq', getRows);

function getRows (error, response) {
  var rows = response.rows;
  var l = rows.length;

  for (var i=0; i<l; i++){
    var html = domify(spaceTemplate(rows[i]));
    list.appendChild(html);
  }
}

eve.on(nav, 'click', function (e) {
  setCard(e.target.id);
  e.preventDefault();
});

if (window.location.hash) {
  setCard(window.location.hash);
}

function setCard (id) {
  var card = (id.charAt(0) == '#' ? id.substring(1) : id) + '-content';
  var l = cards.length;

  for (var i=0; i<l; i++) {
    if (cards[i].id === card) elClass(cards[i]).remove('hidden');
    else elClass(cards[i]).add('hidden');
    window.location.hash = id;
  }
}