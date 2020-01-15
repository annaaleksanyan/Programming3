// datarkutyun = 0
//xot = 1
//xotaker = 2
//amenaker = 3
//gishatich = 4
//shun = 5
//mah = 6

//datarkutyun = spitakavun
//xot = manushakaguyn
//xotaker = vardaguyn
//amenaker = kanach
//gishatich = dexin
//shun = piruzaguyn
//mah = sev

//datarkutyun 0 = vochmiban chi anum|
//xot 1 = bazmanum e: datarkutyunnerum|
//xotaker 2 = sharjvum e: datarkutyunnerov| bazmanum e: datarkutyunnerum| utum e: xot ev mah| xot utelov: energian shatum e| mah utelov: mahanum e| haytnvum e: xotaker<=20| mahanum e: ete iran utum en kam ete inqy utum e mahy
//amenaker 3 = sharjvum e: datarkutyunnerov| chi bazmanum| utum e: xot,xotaker,gishatich ev mah| chi haytnvum| chi mahanum
//gishatich 4 = sharjvum e: datarkutyunnerov ev xoterov| bazmanum e: datarkutyunnerum| utume: xotaker| haytnvum e: ete ==0| mahanum e: ete utum e amenakery kam ete energy<1
//shun 5 = sharjvum e: datarkutyunnerov ev xoterov| chi bazmanum| chi utum| haytnvum e: ete shun<=2| mahanum e: ete utum e amenakery
//mah 6 = sharjvum e: datarkutyunnerov ev xoterov| chu bazmanum| chi utum| haytnvum e: ete mah<1| mahanum e: ete utum e amenakery


//var song;


// function preload(){
//     song = loadSound("Crimson.mp3")
// }



var matrix = [];
let n = 13;
let m = 18;


function setup() {
    for (let i = 0; i < n; i++) {
        matrix[i] = [];
        for (let j = 0; j < m; j++) {
            var probability = random(0, 100)

            if (probability <= 35) {
                matrix[i][j] = 1;
                grassArr.push(new Xot(j, i, 1));
            } else if (probability > 31 && probability <= 44) {
                matrix[i][j] = 2;
                grassEaterArr.push(new Xotaker(j, i, 2));
            } else if (probability > 44 && probability <= 47) {
                matrix[i][j] = 3;
                amenakerArr.push(new Amenaker(j, i, 3));
            } else if (probability > 47 && probability <= 48) {
                matrix[i][j] = 4;
                gishaticharr.push(new Gishatich(j, i, 4));
            } else if (probability > 48 && probability <= 48.6) {
                matrix[i][j] = 5;
                shunarr.push(new Shun(j, i, 5));
            } else if (probability > 48.6 && probability <= 48.8) {
                matrix[i][j] = 6;
                maharr.push(new Mah(j, i, 6));
            } else {
                matrix[i][j] = 0;
            }
        }
    }
    frameRate(30);
    var cnv = createCanvas(matrix[0].length * side, matrix.length * side);

    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.parent('sketch-holder');
    //song.play()
}


var side = 35;
var grassArr = [];
var grassEaterArr = [];
var amenakerArr = [];
var gishaticharr = [];
var shunarr = [];
var maharr = [];


function draw() {
    background(255, 228, 225);
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill(72, 61, 139);
                strokeWeight(2);
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 2) {
                fill(220, 20, 60);
                strokeWeight(2);
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 3) {
                fill(124, 252, 0)
                strokeWeight(2)
                rect(x * side, y * side, side, side)
            } else if (matrix[y][x] == 0) {
                fill(255, 228, 225);
                strokeWeight(2)
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 4) {
                fill("yellow");
                strokeWeight(2)
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 5) {
                fill(30, 144, 255);
                strokeWeight(2)
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill("black");
                strokeWeight(2)
                rect(x * side, y * side, side, side);
            }
        }
    }
    for (var i in grassArr) {
        grassArr[i].bazmacum();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].utel();
    }
    for (var i in amenakerArr) {
        amenakerArr[i].utel();
    }
    for (var i in gishaticharr) {
        gishaticharr[i].utel();
    }
    for (var i in shunarr) {
        shunarr[i].sharjvel();
    }
    for (var i in maharr) {
        maharr[i].sharjvel();
    }
    if (grassArr.length < 1) {
        grassArr.push(new Xot(4, 4, 1))
    }
    if (gishaticharr.length == 0) {
        gishaticharr.push(new Gishatich(0, 0, 4))
    }
    if (maharr.length < 1) {
        maharr.push(new Mah(1, 1, 6))
    }
    if (shunarr.length <= 2) {
        shunarr.push(new Shun(2, 2, 5))
    }
    if (grassEaterArr.length <= 20) {
        grassEaterArr.push(new Xotaker(3, 3, 2))
    }
}

//verch:]]]]