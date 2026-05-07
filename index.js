import express from 'express';
import { pool } from './pgConfig.js';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/gradebook', async (req, res) => {
    const { student } = req.body;
    const sql = `SELECT s1.фамилия, задание.название, s1.получил_оценку
                 FROM (SELECT герой.фамилия, журнал.получил_оценку, журнал.выполнил_задание
                       FROM журнал JOIN герой ON журнал.оцениваем = герой.герой
                       WHERE герой.фамилия = $1) AS s1
                 JOIN задание ON s1.выполнил_задание = задание.задание`;

    const results = await pool.query(sql, [student]);
    res.render('gradebook', { grades: results.rows, student: student });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
