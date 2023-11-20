const WithTime = require("./WithTime.js");

const withTime = new WithTime();

const beginListener = () => console.log("About to execute");
const endListener = (data, totalTime) => {
    console.log(`Done with execute in ${totalTime}ms. Received data:`);
    console.log(data);
};

withTime.on("begin", beginListener);
withTime.on("end", endListener);

console.log(withTime.rawListeners("end"));

const getData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

withTime.execute(getData, "https://jsonplaceholder.typicode.com/posts/1");
