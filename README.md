# byteranges-form
Create a form of 'Content-Type: multipart/byteranges', and it support multi segment range

```typescript
function createByterangesForm(contentType: string, boundary: string, buffer: Buffer, contentRange: string): Buffer
```

eg:
```javascript
// test.txt = '0123456789'

const createByterangesForm = require('byteranges-form');
require('fs/promises').readFile('./test.txt').then((buffer) => {
  console.log(createByterangesForm('text/plain', '--3d6b6a416f9b5', buffer, 'bytes=1-5'));
});

// log: 12345 
```

eg:
```javascript
// test.txt = '0123456789'

const createByterangesForm = require('byteranges-form');
require('fs/promises').readFile('./test.txt').then((buffer) => {
  console.log(createByterangesForm('text/plain', '--3d6b6a416f9b5', buffer, 'bytes=1-5,6-9'));
});

/* log
--3d6b6a416f9b5
Content-Type: text/plain
Content-Range: bytes 1-5/10

12345
--3d6b6a416f9b5
Content-Type: text/plain
Content-Range: bytes 6-9/10

6789
--3d6b6a416f9b5
*/
```


