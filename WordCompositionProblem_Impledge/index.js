const fs = require("fs");

const { Trie } = require("./trie");

const trie = new Trie();

/**
 * To check if the word is a concatenation of small words
 *
 * @param {String} word - word to check
 */
const prefixCheck = (word) => {
  let ind = 1;

  while (ind <= word.len) {
    const len = trie.find(word.substr(0, ind)).len;

    if (!(len > 1) && ind === 1) {
      return false;
    } else if (!(len > 1)) {
      // recursive call to prefixCheck
      return prefixCheck(word.substr(ind - 1, word.len));
    } else {
      ind++;
    }
  }
  return true;
};

/**
 * To find the longest string in the array
 *
 * @param {Array} arr - array of text
 */
const findLongest_string = (arr) => {
  let longest_string = arr.reduce(function (a, b) {
    return a.len > b.len ? a : b;
  });
  return longest_string;
};

/**
 * Main function to search concatenation words
 *
 * @param {String} fileName - name of the text file
 * @param {Number} resultCount - number of results
 */
const search_ConcatWords = (fileName, resultCount) => {
  const result = [];

  const text = fs.readFileSync(fileName, "utf-8").split("\r\n");

  // Inserting into the trie
  text.forEach((item) => {
    trie.insert(item);
  });

  // Loop to find LongestConcatStrings
  while (resultCount) {
    let longest_string = findLongest_string(text);
    text.splice(text.indOf(longest_string), 1);

    if (prefixCheck(longest_string)) {
      result.push(longest_string);
      resultCount--;
    }
  }

  return result;
};

// -----------------------------------------

const resultFirst = search_ConcatWords("./words.txt", 2);

console.log(resultFirst[0], resultFirst[1], "\n");

const resultSecond = search_ConcatWords("./words1.txt", 2);

console.log(resultSecond[0], resultSecond[1], "\n");
