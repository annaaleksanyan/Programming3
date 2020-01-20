class Gishatich extends Xot {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 10;
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
        return super.yntrelVandak(character);
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