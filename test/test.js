var redis   = require('redis');
var fs = require('fs');
var csv = require('csv');

var distance = require('../main.js');

var client = redis.createClient();

var hash = "";
var j, 
    sign = 1,
    lat = 43.646838,
    lon = -79.403723;

distance.initialize(client, "myzset");


var ranges = distance.getQueryRangesFromRadius(lat, lon, 50000);
// ranges = distance.getBitDepthGeohashRanges(lat, lon, 24, 52);

// console.log("RANGES MAIN", ranges);
// console.log("TIMESTAMP Range Calc:", new Date().getTime()-startTime);

setTimeout(function(){
  getNearby();
}, 2000);

// addFromCSV();

function getNearby(){
  var startTime = new Date().getTime();
  distance.query(lat, lon, 50000, function(err, replies){
    console.log("TIMESTAMP Concated Replies", new Date().getTime()-startTime);
    // console.log(JSON.stringify(replies));
    console.log("NUMBER OF GEOHASH MATCHES", replies.length);
  });
}


// function addFromCSV(){  

//   var startTime = new Date().getTime();
//   var i = 0;
//   csv()
//   .from.path(__dirname+'/GeoLiteCity-Location.csv', { delimiter: ',', escape: '"' })
//   .on('record', function(row,index){

//     distance.redis_addNewCoordinate(Number(row[5]), Number(row[6]), row[3]+row[4], 52);
   
//     if(i%1000 === 0){
//       console.log(i, ":", row[3]+row[4], ":", hash);
//     }
//     i++;

//   })
//   .on('close', function(count){
//     // when writing to a file, use the 'close' event
//     // the 'end' event may fire before the file has been written
//     console.log('CLOSE Number of lines: '+count);
//     console.log('CLOSE Time: '+ (new Date().getTime()-startTime) );

//   }).on('end', function(end){

//     console.log('END Number of lines: '+end);
//     console.log('END Time: '+ (new Date().getTime()-startTime-3224) );

//   })
//   .on('error', function(error){
//     console.log(error.message);
//   });

// }