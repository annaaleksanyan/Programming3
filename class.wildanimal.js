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