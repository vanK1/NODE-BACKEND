//  import fs from 'fs';
import os from 'os';


// console.log (os.arch())
// console.log (os.type())
// console.log (os.uptime() / 60/60)
// console.log (os.freemem())
// console.log (os.totalmem())
// console.log (os.networkInterfaces()) 



// //This is used to modifiy the content of a file but it will not create a new file if it does not exist.
// fs.writeFile('miracle.txt','I love coding!', (err)=>{
//     if (err) {
//         console.error('Error writing to file:', err);
//     } else {
//         console.log('File written successfully');
//     }
// })

// //This is used to read the content of a file.
// fs.readFile('./box/joe.txt','utf-8',(err,data)=>{
//     if (err) {
//         console.error('Error reading file:', err);
//     } else {
//         console.log('File content:', data);
//     }
// })

// // This is used to delete a file.
// fs.unlink('miracle.txt',(err)=>{
//     if (err) {
//         console.error('Error deleting file:', err);
//     } else {
//         console.log('File deleted successfully');
//     }
// })