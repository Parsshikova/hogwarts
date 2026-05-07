import {pool} from "./pgConfig.js"
const sql = "select s1.фамилия, задание.название, \
	s1.получил_оценку from \
	(select герой.фамилия, журнал.получил_оценку, журнал.выполнил_задание \
	from журнал join герой on \
	журнал.оцениваем = герой.герой where герой.фамилия = $1) \
	as s1 join задание on s1.выполнил_задание = задание.задание;"

async function f(){
	const results = await pool.query(sql, ["Поттер"]);
	pool.end();
	console.log(results.rows);
	}
f();
