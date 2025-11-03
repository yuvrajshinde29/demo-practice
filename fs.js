const fs = require("node:fs").promises;
const path = require("node:path");

/* //read file
fs.readFile('index.js','utf-8',(err, data)=>{
    if(err) return console.log("error reading file",err)
        console.log(data)

}) */

/* fs.appendFile("test.txt", "\nheloo world!", (err) => {
  if (err) return console.log(err);
  console.log("file write success");
});
 */

/* fs.rename('new.txt','test.txt',(err)=>{
    if(err) return console.log(err)
        
}) */

/* fs.readdir(foldername, (err, files)=>{
    if(err){
        console.log(err)
    }else
    console.log(files)
}) */

async function deleteDir(){
    const data = await fs.stat('fs.js')
    console.log(data, data.isFile())
}

deleteDir()