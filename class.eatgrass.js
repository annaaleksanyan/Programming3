class Xotaker extends Xot {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 20;
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
        return super.yntrelVandak(character);
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
        if (newCell && this.multiply >= 20) {
            matrix[newY][newX] = 2;
            grassEaterArr.push(new Xotaker(newX, newY, 2));
            return super.bazmacum();
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