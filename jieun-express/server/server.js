const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

// app.get('/', (req, res)=>{
//     res.send('Hello World!')
// })

app.post('/info',(req,res)=>{
    const info = req.body.id;
    console.log('id: ',info);
    // console.log(password);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
