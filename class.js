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



//1
class Xot {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;

        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    yntrelVandak(character) {
        var datarkutyun = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    datarkutyun.push(this.directions[i]);
                }
            }
        }
        return datarkutyun;
    }

    bazmacum() {
        this.multiply += 1.8;
        var newCell = random(this.yntrelVandak(0));
        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;
            this.multiply = 0;
            grassArr.push(new Xot(newX, newY, 1));
        }
    }
}



//2
class Xotaker {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 20;
        this.multiply = 0;
        this.index = index;
        this.directions = [];
    }

    stanalNorKordinatner() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    yntrelVandak(character) {
        this.stanalNorKordinatner();
        var datarkutyun = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    datarkutyun.push(this.directions[i]);

                }
            }
        }
        return datarkutyun;
    }

    sharjvel() {
        var newCell = random(this.yntrelVandak(0));
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.x = x
            this.y = y
        }
    }

    utel() {
        this.stanalNorKordinatner()
        var newCell = random(this.yntrelVandak(1)) || random(this.yntrelVandak(6));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            if (matrix[newY][newX] == 1) {
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = 2;
                this.x = newX;
                this.y = newY;
                this.energy++;
                if (this.energy > 20) {
                    this.energy = 10;
                }
                for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
                this.bazmacum();
            } else {
                this.mernel()
            }
        }
        else {
            this.energy--;
            this.sharjvel();
            if (this.energy <= 1) {
                this.mernel();
            }
        }
    }

    bazmacum() {
        this.multiply += 1.5;
        var newCell = random(this.yntrelVandak(0));
        if (newCell && this.multiply >= 20) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;
            grassEaterArr.push(new Xotaker(newX, newY, 2));
            this.multiply = 0;
        }
    }

    mernel() {
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }
    }
}



//3
class Amenaker {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.directions = [];
    }

    stanalNoraguynKordinatner() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }

    yntrelVandak(character) {
        this.stanalNoraguynKordinatner();
        var datarkutyun = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    datarkutyun.push(this.directions[i]);
                }
            }
        }
        return datarkutyun;
    }

    sharjvel() {
        var newCell = random(this.yntrelVandak(0));
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x
            this.y = y
        }
    }

    utel() {
        this.stanalNoraguynKordinatner()
        var newCell = random(this.yntrelVandak(1)) || random(this.yntrelVandak(2)) || random(this.yntrelVandak(4)) || random(this.yntrelVandak(5)) || random(this.yntrelVandak(6));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 3;
            this.x = newX
            this.y = newY
            if (matrix[newY][newX] == 2) {
                for (var i in grassEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (matrix[newY][newX] == 1) {
                for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }

            }
            else if (matrix[newY][newX] == 4) {
                for (var i in gishaticharr) {
                    if (newX == gishaticharr[i].x && newY == gishaticharr[i].y) {
                        gishaticharr.splice(i, 1);
                        break;
                    }
                }

            }
            else if (matrix[newY][newX] == 5) {
                for (var i in shunarr) {
                    if (newX == shunarr[i].x && newY == shunarr[i].y) {
                        shunarr.splice(i, 1);
                        break;
                    }
                }

            }
            else if (matrix[newY][newX] == 6) {
                for (var i in maharr) {
                    if (newX == maharr[i].x && newY == maharr[i].y) {
                        maharr.splice(i, 1);
                        break;
                    }
                }

            }
        }
    }
}



//4
class Gishatich {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 10;
        this.multiply = 0;
        this.index = index;
        this.directions = [];
    }

    stanalNorKordinatner() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    yntrelVandak(character) {
        this.stanalNorKordinatner();
        var datarkutyun = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    datarkutyun.push(this.directions[i]);
                }
            }
        }
        return datarkutyun;
    }

    sharjvel() {
        var newCell = random(this.yntrelVandak(0)) || random(this.yntrelVandak(1));
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.x = x
            this.y = y
        }
    }

    utel() {
        this.stanalNorKordinatner()
        var newCell = random(this.yntrelVandak(2));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;
            this.x = newX
            this.y = newY
            this.energy++
            if (this.energy > 25) {
                this.energy = 10;
            }
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            this.bazmacum();
        } else {
            this.sharjvel()
            this.energy--
            if (this.energy < 1) {
                this.mernel()
            }
        }
    }

    bazmacum() {
        this.multiply += 2;
        var norvandak = random(this.yntrelVandak(0));
        if (this.multiply >= 8 && norvandak) {
            var x = norvandak[0];
            var y = norvandak[1];
            grassEaterArr.push(new Gishatich(x, y, 4))
            matrix[y][x] = 4;
            this.multiply = 0;
        }
    }

    mernel() {
        for (var i in gishaticharr) {
            if (this.x == gishaticharr[i].x && this.y == gishaticharr[i].y) {
                gishaticharr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }
    }
}



//5
class Shun {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 8;
        this.directions = [];
    }

    stanalNorKordinatner() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    yntrelVandak(character) {
        this.stanalNorKordinatner();
        var datarkutyun = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    datarkutyun.push(this.directions[i]);
                }
            }
        }
        return datarkutyun;
    }

    sharjvel() {
        var newCell = random(this.yntrelVandak(0)) || random(this.yntrelVandak(1));
        this.energy++
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.x = x
            this.y = y
        }
        if (this.energy > 15) {
            this.energy = 5
        }
    }
}



//6
class Mah {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.directions = [];
    }

    stanalNorKordinatner() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    yntrelVandak(character) {
        this.stanalNorKordinatner();
        var datarkutyun = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    datarkutyun.push(this.directions[i]);

                }
            }
        }
        return datarkutyun;
    }

    sharjvel() {
        this.stanalNorKordinatner()
        var newCell = random(this.yntrelVandak(0)) || random(this.yntrelVandak(1));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 6;
            this.x = newX
            this.y = newY
        }
    }
}

//verch:]]]]