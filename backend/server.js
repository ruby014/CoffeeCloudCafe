// entry point for api
import express from 'express'; 

const app = express(); 

// to listen for connections on the specified host and port
app.listen(5000, () => {
    console.log('Server started at http://localhost:5000'); 
}); 

// to route GET reqs to the specified path 
