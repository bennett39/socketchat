var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var connectionCount = 0;
const nicknames = ["Pickles", "Cheddar", "Snickers", "Twix", "Rocketfuel", "Mustard", "Skittles", "Redbull", "TurkeyLeg", "Rolo", "DietCoke", "Turkey Melt", "M&M", "MrSmith", "Coke Zero", "ThousandIsland", "SwissMiss", "Jalapeno", "Cannoli", "Cheesestick", "ChiliBowl", "SnackAttack", "BeefJerky", "Oregano", "SpicedChai", "SnickySnack", "Pretzel", "HotSauce", "Triscuit", "Cheerio", "FrenchDip", "Biscuit", "Popcorn", "TheRuben", "Ritz", "Twizzler", "BigNasty", "Cheeto", "PeachO", "DoubleStuff", "Dorito", "Jello", "LovinSpoonful", "Frito", "Chicken Wing", "ChickenThigh", "BaconBitzzz", "TeddyGram", "ColdBrew", "RoastBeef", "Saltine", "Butterball"];
var usersOnline = {};

io.on('connection', function(socket){
  socket.on('new user', function(){
    connectionCount++;
    nickname = nicknames[connectionCount % nicknames.length] + Math.floor(Math.random() * 100).toString();
    usersOnline[socket.id] = nickname;
    socket.emit('set name', nickname);
    io.emit('join', nickname + ' joined the chat...');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function() {
    io.emit('join', usersOnline[socket.id] + ' left the chat...');
    // connectionCount--;
  });
});

const port = process.env.PORT || 3000;
http.listen(port, function(){
  console.log('listening on *:' + port);
});
