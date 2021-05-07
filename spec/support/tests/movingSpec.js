const { Game } = require("../../../game");
describe("Hello world", () => {

    it("Should move left and merge all 2s", () => {
        const game = new Game();
        game.gridArray = [
            [2,0,0,2],
            [2,2,0,0],
            [0,2,0,2],
            [0,0,2,2],
        ]
        game.moveLeft();
        game.gridArray.forEach(row => {
            expect(row[0]).toBe(4);
        })
    })
})