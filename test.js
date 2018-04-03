var input = [
  [8, 2, 1, 'I love monkeys.'],
  [5, 2, 1, 'He he'],
  [15, 0, 0, 'This is a longer text. Does it work?'],
  [5, 2, 1, 'Ha ha']];

function printResults(res) {
  for(var res_i=0; res_i < res.length; res_i++) {
    console.log(res[res_i]+"\n");
  }
}

function addSpace(pos, max, isLastWord) {
  if (isLastWord) return pos < max ? '_'.repeat(max-pos) : '';
  return pos < max ? '_' : '';
}

function addTextToLine(lines, lineIndex, start, max, words, orgStart) {
  if (!words || words.length === 0) return lines;
  
  let line = lines[lineIndex];
  line = (!line) ? '_'.repeat(start) : line;
  if (line.charAt(start) === '') line = line + '_'.repeat(start - line.length);
  lines[lineIndex] = line;

  var word = words[0];

  if (line.charAt(start) === '') {
    if (line.length + word.length <= max) { // Room for another word.
      var isLastWord = words.length === 1;
      lines[lineIndex] = line.slice(0, start) + word + addSpace(start + word.length, max, isLastWord);
      words.shift();
      return addTextToLine(lines, lineIndex, lines[lineIndex].length, max, words, orgStart);
    }
    var remainer = (max - lines[lineIndex].length > 0) ? max - lines[lineIndex].length : 0;
    lines[lineIndex] = lines[lineIndex] + '_'.repeat(remainer);
    return addTextToLine(lines, lineIndex+1, orgStart, max, words, orgStart);
  }
  if (line.charAt(start) !== '_') return addTextToLine(lines, lineIndex, start+1, max, words, orgStart);
  if (start + word.length > max) return addTextToLine(lines, lineIndex+1, orgStart, max, words, orgStart);

  let pos = start;
  while (pos < start + word.length) {
    if (line.charAt(start)) return addTextToLine(lines, lineIndex, start+1, max, words, orgStart);
    pos++;
  }
  lines[lineIndex] = line.slice(0, start) + word + addSpace(pos, max, isLastWord) + line.slice(pos);
  words.shift();
  return addTextToLine(lines, lineIndex, pos, max, words, orgStart);
}

function layout(lines) {

  var results = lines.reduce((acc, line) => {
    var width = line[0];
    var x = line[1];
    var y = line[2];
    var text = line[3];
    var words = text.split(' ');

    // Add empty string to results if row is null
    for (var i = 0; i < y; i++) {
      if (acc[i] === undefined) acc[i] = '_';
    }
    return addTextToLine(acc, y, x, x+width, words, x);

  }, []);

  return printResults(results);
}


layout(input);