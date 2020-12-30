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
  suite("POST request to /api/check", () => {
    const url = "/api/check";
    test("Check a puzzle placement with all fields", () => {
      chai
        .request(server)
        .post(url)
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          puzzle: goodPuzzle,
          coordinate: "B1",
          value: "3",
        })
        .end((err, res) => {
          assert.equal(res.status, 200, "status should be 200");
          assert.isObject(res.body, "should be an object");
          assert.hasAllKeys(res.body, "valid", "should only return valid");
          assert.isTrue(res.body.valid, "valid should return true");
        });
    });
    test("Check a puzzle placement with single placement conflict", () => {
      chai
        .request(server)
        .post(url)
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          puzzle: goodPuzzle,
          coordinate: "B1",
          value: "8",
        })
        .end((err, res) => {
          assert.equal(res.status, 200, "status should be 200");
          assert.isObject(res.body, "should be an object");
          assert.hasAllKeys(
            res.body,
            ["valid", "conflict"],
            "should return valid & conflict"
          );
          assert.isFalse(res.body.valid, "valid should return false");
          assert.deepEqual(
            res.body.conflict,
            ["row"],
            'should only return "row" as conflict'
          );
        });
    });
    test("Check a puzzle placement with multiple placement conflicts", () => {
      chai
        .request(server)
        .post(url)
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          puzzle: goodPuzzle,
          coordinate: "B1",
          value: "6",
        })
        .end((err, res) => {
          assert.equal(res.status, 200, "status should be 200");
          assert.isObject(res.body, "should be an object");
          assert.hasAllKeys(
            res.body,
            ["valid", "conflict"],
            "should return valid & conflict"
          );
          assert.isFalse(res.body.valid, "valid should return false");
          assert.deepEqual(
            res.body.conflict,
            ["column", "region"],
            'should return both "column" & "region" as conflicts'
          );
        });
    });
    test("Check a puzzle placement with multiple placement conflicts", () => {
      chai
        .request(server)
        .post(url)
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          puzzle: goodPuzzle,
          coordinate: "B5",
          value: "7",
        })
        .end((err, res) => {
          assert.equal(res.status, 200, "status should be 200");
          assert.isObject(res.body, "should be an object");
          assert.hasAllKeys(
            res.body,
            ["valid", "conflict"],
            "should return valid & conflict"
          );
          assert.isFalse(res.body.valid, "valid should return false");
          assert.deepEqual(
            res.body.conflict,
            ["row", "column", "region"],
            "should return all three as conflicts"
          );
        });
    });
    test("Check a puzzle placement with missing required fields", () => {
      chai
        .request(server)
        .post(url)
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          puzzle: goodPuzzle,
          value: "7",
        })
        .end((err, res) => {
          assert.equal(res.status, 200, "status should be 200");
          assert.isObject(res.body, "should be an object");
          assert.hasAllKeys(res.body, "error", "should only return error");
          assert.propertyVal(res.body, "error", "Required field(s) missing");
        });
    });
    test("Check a puzzle placement with invalid characters", () => {
      const badCharacters = goodPuzzle.replace(/^\S{6}/, "sudoku");
      chai
        .request(server)
        .post(url)
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          puzzle: badCharacters,
          coordinate: "B1",
          value: "3",
        })
        .end((err, res) => {
          assert.equal(res.status, 200, "status should be 200");
          assert.isObject(res.body, "should be an object");
          assert.hasAllKeys(res.body, "error", "should only return error");
          assert.propertyVal(res.body, "error", "Invalid characters in puzzle");
        });
    });
    test("Check a puzzle placement with incorrect length", () => {
      const tooLong = `1.2.3.4.${goodPuzzle}`;
      chai
        .request(server)
        .post(url)
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          puzzle: tooLong,
          coordinate: "B1",
          value: "3",
        })
        .end((err, res) => {
          assert.equal(res.status, 200, "status should be 200");
          assert.isObject(res.body, "should be an object");
          assert.hasAllKeys(res.body, "error", "should only return error");
          assert.propertyVal(
            res.body,
            "error",
            "Expected puzzle to be 81 characters long"
          );
        });
    });
    test("Check a puzzle placement with invalid placement coordinate:", () => {
      chai
        .request(server)
        .post(url)
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          puzzle: goodPuzzle,
          coordinate: "BOB69",
          value: "7",
        })
        .end((err, res) => {
          assert.equal(res.status, 200, "status should be 200");
          assert.isObject(res.body, "should be an object");
          assert.hasAllKeys(res.body, "error", "should only return error");
          assert.propertyVal(res.body, "error", "Invalid coordinate");
        });
    });
    test("Check a puzzle placement with invalid placement value:", () => {
      chai
        .request(server)
        .post(url)
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          puzzle: goodPuzzle,
          coordinate: "B1",
          value: "Hello",
        })
        .end((err, res) => {
          assert.equal(res.status, 200, "status should be 200");
          assert.isObject(res.body, "should be an object");
          assert.hasAllKeys(res.body, "error", "should only return error");
          assert.propertyVal(res.body, "error", "Invalid value");
        });
    });
  });
});
