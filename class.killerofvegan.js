class Mah extends Xot {
    constructor(x, y, index) {
        super(x, y, index)
    }
    //1.ete asenq Jarangy voric uzum em jarangem uni tenc tvyal vory indz petq chi, es karam tenc anem vor et tvyaly chjarangvi.
    //2.karam poxem jarangvox tvyaly?
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