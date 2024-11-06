// const {IncomingForm} = require('formidable');

// const { readTasksfromFile, writeTasktoFile } = require("../utils/fileHandler");
// const { copyFileSync } = require('fs');
// const path = require('path');


// // get tasks from file
// exports.getTasks = (req , res) =>{
//     const tasks = readTasksfromFile();
//     res.writeHead(200 , 'content-type' , 'application/json');
//     res.end(JSON.stringify(tasks));
// }

// createtask list
exports.createTask = (req , res) =>{
    const form = new IncomingForm();
    form.parse(req , (err , fields , files) => {
        
        if(err){
            res.writeHead(400 , {'content-type': 'application/json'});
            res.end(JSON.stringify({ message : 'Error parsing form'}));
            return;
        }

        const image = files.image[0];
        const tasks = readTasksfromFile();

        const newTasks = {
            id: Date.now(),
            title: fields.title,
            description: fields?.description || '',
            status: fields?.status || 'pending',
            image: image? `/uploads/${image.originalFilename}` : null,
        }
            console.log(fields.description);
        tasks.push(newTasks);
        writeTasktoFile(tasks);

        if(files.image) {
            copyFileSync(image.filepath, path.join(__dirname, '../uploads' , image.originalFilename));
            res.end(JSON.stringify(newTasks));
        }
    }); 
    
}

// exports.updateTask = (req , res) => {
//     const form = new IncomingForm();
//     form.parse(req , (err , fields , files) => {

//         if(err) {
//             res.writeHead(400 , {'content-type': 'application/json'});
//             res.end(JSON.stringify({message: 'Error parsing form'}));
//             return;
//         }
//         if(!fields.title){
//             res.writeHead(400 , {'content-type': 'application/json'});
//             res.end(JSON.stringify({message: 'Title is required'})); 
//             return;
//         }

//         const image = files.image ? files.image[0] : null;
//         const tasks = readTasksfromFile();
//         const taskId  = parseInt(req.url.split('/').pop());
//         const taskIndex = tasks.findIndex(task => task.id === taskId);

//         if(taskIndex === -1){
//             res.writeHead(404 , {'content-type': 'application/json'});
//             res.end(JSON.stringify({message: 'Any task not found'}));

//             return;
//         }

//         const updatedTask = {
//             ...tasks[taskIndex],
//             title: fields.title || tasks[taskIndex].title,
//             description: fields.description || tasks[taskIndex].description,
//             status: fields.status || tasks[taskIndex].status,
//             image: image ? `/uploads/${image.originalFilename}` : tasks[taskIndex].image,
//         }

//         tasks[taskIndex] = updatedTask;
//         writeTasktoFile(tasks);

//         if(image) {
//             copyFileSync(image.filepath, path.join(__dirname, '../uploads' , image.originalFilename));
//         }

//         res.writeHead(200 , {'content-type': 'application/json'});
//         res.end(JSON.stringify(updatedTask))

      
//     })
    
// }

// exports.deleteTask = (req , res) => {
//     const tasks = readTasksfromFile();
//     const taskId = parseInt(req.url.split('/').pop());
//     const taskIndex = tasks.findIndex(task => task.id === taskId);

//     if (taskIndex === -1) {
//         res.writeHead(404, { 'content-type': 'application/json'});
//         res.end(JSON.stringify({
//             message: 'Task not found'
//         }))
//         return;
//     }

//     const updatedTasks = tasks.filter(task => task.id !== taskId);
//     writeTasktoFile(updatedTasks);
//     res.writeHead(200, { 'content-type': 'application/json' });
//     res.end(JSON.stringify({
//         message: 'Task successfully deleted'
//     }));
// }