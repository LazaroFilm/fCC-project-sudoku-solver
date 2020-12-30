const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");

const PuzzleSamples = require("../controllers/puzzle-strings.js");
const puzzleSamples = PuzzleSamples.puzzlesAndSolutions;
const goodPuzzle = puzzleSamples[0][0];
const goodAnswer = puzzleSamples[0][1];

chai.use(chaiHttp);

suite("Functional Tests", () => {
  suite("POST request to /api/solve", () => {
    const url = "/api/solve";
    test("Solve a puzzle with valid puzzle string", () => {
      chai
        .request(server)
        .post(url)
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          puzzle: goodPuzzle,
        })
        .end((err, res) => {
          assert.equal(res.status, 200, "status should be 200");
          assert.isObject(res.body, "should be an object");
          assert.hasAllKeys(
            res.body,
            "solution",
            'should only return "solution"'
          );
          assert.propertyVal(res.body, "solution", goodAnswer);
        });
    });
    test("Solve a puzzle with missing puzzle string", () => {
      chai
        .request(server)
        .post(url)
        .end((err, res) => {
          // console.log(res.body);
          assert.equal(res.status, 200, "status should be 200");
          assert.isObject(res.body, "should be an object");
          assert.hasAllKeys(res.body, "error", 'should only return "error"');
          assert.propertyVal(res.body, "error", "Required field missing");
        });
    });
    test("Solve a puzzle with invalid characters", () => {
      const badCharacters = goodPuzzle.replace(/^\S{6}/, "sudoku");
      chai
        .request(server)
        .post(url)
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          puzzle: badCharacters,
        })
        .end((err, res) => {
          assert.equal(res.status, 200, "status should be 200");
          assert.isObject(res.body, "should be an object");
          assert.hasAllKeys(res.body, "error", 'should only return "error"');
          assert.propertyVal(res.body, "error", "Invalid characters in puzzle");
        });
    });
    test("Solve a puzzle with incorrect length", () => {
      const tooLong = `1.2.3.4.${goodPuzzle}`;
      chai
        .request(server)
        .post(url)
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          puzzle: tooLong,
        })
        .end((err, res) => {
          assert.equal(res.status, 200, "status should be 200");
          assert.isObject(res.body, "should be an object");
          assert.hasAllKeys(res.body, "error", 'should only return "error"');
          assert.propertyVal(
            res.body,
            "error",
            "Expected puzzle to be 81 characters long"
          );
        });
    });
    test("Solve a puzzle that cannot be solved", () => {
      const badPuzzle = goodPuzzle.replace(/^\S{2}/, "15");
      chai
        .request(server)
        .post(url)
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          puzzle: badPuzzle,
        })
        .end((err, res) => {
          assert.equal(res.status, 200, "status should be 200");
          assert.isObject(res.body, "should be an object");
          assert.hasAllKeys(res.body, "error", 'should only return "error"');
          assert.propertyVal(res.body, "error", "Puzzle cannot be solved");
        });
    });
  });
});
