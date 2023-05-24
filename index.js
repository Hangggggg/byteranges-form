const { Buffer } = require('buffer');
const os = require('os');

function createByterangesForm(contentType, boundary, buffer, contentRange) {
  const ranges =  [...contentRange.matchAll(/([0-9]*)-([0-9]*)/g)].map((item) => {
    return [+item[1], +item[2]];
  });
  if (ranges.length === 1) {
    return buffer.subarray(ranges[0][0], ranges[0][1] + 1);
  } else {
    let sumBuffer = Buffer.from(`${boundary}${os.EOL}`);
    for (const range of ranges) {
      sumBuffer = sumBuffer 
      + Buffer.from(`Content-Type: ${contentType}${os.EOL}Content-Range: bytes ${range[0]}-${range[1]}/${buffer.length}${os.EOL}${os.EOL}`) 
      + buffer.subarray(range[0], range[1] + 1)
      + Buffer.from(`${os.EOL}${boundary}${os.EOL}`);
    }
    return sumBuffer;
  }
}

module.export = createByterangesForm;