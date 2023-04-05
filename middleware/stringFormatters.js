// Middleware to change the formatting of filename to match the DB entries.

function toTitleCase(to_split) {
  let split_str = to_split.toLowerCase().split(" ");
  let title_case_str = [];

  for (let str of split_str) {
    let word = str.charAt(0).toUpperCase() + str.substring(1);
    title_case_str.push(word);
  }

  return title_case_str.join(" ");
}

module.exports = { toTitleCase };
