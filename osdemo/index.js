import os from
console.log("Operating System:", os.type());
console.log("OS Version:", os.version());
console.log("CPU Architecture:", os.arch());
console.log("Total Memory:", os.totalmem(), "bytes");

export default os;