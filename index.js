var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var connectionCount = 0;
const nicknames = [
  "Pickles", "Cheddar", "Snickers", "Chip", "Cheese", "Twix",
  "Rocketfuel", "Mustard", "Skittles", "Redbull", "Turkey Leg",
  "Rolo", "Diet Coke", "Turkey Melt", "M&M", "Mr. Smith", "Ranch",
  "PB&J", "Coke Zero", "Thousand Island", "Swiss Miss", "Salt",
  "Del Del", "American Cheese", "Pepper", "Cannoli", "Cheesestick",
  "Chili", "Snack Attack", "Beef Jerky", "Oregano", "Snacks",
  "Pickle", "Spice", "Snicky Snack", "Pretzel", "Hot Sauce", "Triscuit",
  "Cheerio", "French Dip", "Biscuit", "Popcorn", "The Ruben",
  "Ritz", "Twizzler", "Big Nasty", "Cheeto", "Peach O", "Double Double",
  "Dorito", "Jello", "Lovin’ Spoonful", "Frito", "Chicken Wing",
  "Club Sandwich", "Pepperidge Farm", "Chicken Thigh", "Bacon",
  "Teddy Gram", "Cold Brew", "Roast Beef", "Saltine", "Butter",
];

io.on('connection', function(socket){
  socket.on('new user', function(){
    connectionCount++;
    nickname = nicknames[connectionCount % nicknames.length];
    socket.emit('set name', nickname);
    io.emit('join', nickname + ' joined the chat...');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function() {
    // connectionCount--;
  });
});

const port = process.env.PORT || 3000;
http.listen(port, function(){
  console.log('listening on *:' + port);
});
