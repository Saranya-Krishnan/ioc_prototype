import express from 'express';
import router from './routes/index';
let app = express();

app.use('/bin', express.static('./bin'));
app.use('/', router);
app.use('/view/*', router);


app.listen(3000, function () {
    console.log('Ioc Express Server started');
});