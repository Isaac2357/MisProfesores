const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');
const professorsRouter = require('./routes/professors');
const relationsRouter = require('./routes/relations');
const coursesRouter = require('./routes/courses');
const passwordRouter = require('./routes/password');


app.use(cors());
app.use(express.json());

app.use(express.static(__dirname+'/public'));

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/professors', professorsRouter);
app.use('/api/relations', relationsRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/password', passwordRouter);

app.listen(port, () => console.log(`MisProfesores available in: http://localhost:${port}`));
