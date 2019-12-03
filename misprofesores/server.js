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

app.use(cors());
app.use(express.json());

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/professors', professorsRouter);
app.use('/api/relations', relationsRouter);
app.use('/api/courses', coursesRouter);

app.listen(port, () => console.log(`MisProfesores available in: http://localhost:${port}`));