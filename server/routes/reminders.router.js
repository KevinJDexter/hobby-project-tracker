const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/:projectId', (req, res) => {
  console.log('GET /api/reminder/projectId');
  if (req.isAuthenticated()) {
    const query = `
      SELECT *
      FROM "reminders"
      WHERE "project_id" = $1
      AND EXISTS (SELECT 1
                  FROM "reminders" AS "r"
                  JOIN "projects" AS "p"
                  ON "r"."project_id" = "p"."id"
                  WHERE "r"."id" = $1
                  AND "p"."user_id" = $2);
    `;
    const params = [
      req.params.id,
      req.user.id
    ];
    pool.query(query, params)
      .then(results => {
        res.send(results.rows);
      })
      .catch(error => {
        res.sendStatus(500);
        console.log('ERROR in GET /api/reminder/projectId :', error);
      })
  } else {
    res.sendStatus(403);
  }
})

router.post('/', (req, res) => {
  console.log('POST /api/reminder');
  if (req.isAuthenticated()) {

    const date = req.body.date;
    const message = req.body.message;
    const viaPhone = req.body.viaPhone;
    const viaEmail = req.body.viaEmail;
    const projectId = req.body.projectId;

    const query = `
    INSERT INTO "reminders" (
      "date",
      "message",
      "via_phone",
      "via_email",
      "project_id"
    )
    VALUES ( $1, $2, $3, $4, $5 )
    WHERE EXISTS (SELECT 1
                  FROM "projects"
                  WHERE "id" = $5
                  AND "user_id" = $6)
    RETURNING "id";
  `;
    const params = [
      date,
      message,
      viaPhone,
      viaEmail,
      projectId,
      req.user.id
    ];

    pool.query(query, params)
      .then(results => {
        res.send(results.rows);
      })
      .catch(error => {
        res.sendStatus(500);
        console.log('ERROR in POST /api/reminder :', error);
      })
  } else {
    res.sendStatus(403);
  }
})

router.put('/:id', (req, res) => {
  console.log('PUT /api/reminder/id');
  if (req.isAuthenticated()) {

    const date = req.body.date;
    const message = req.body.message;
    const viaPhone = req.body.viaPhone;
    const viaEmail = req.body.viaEmail;

    const query = `
      UPDATE "reminders"
      SET 
        "date" = $1,
        "message" = $2,
        "viaPhone" = $3,
        "viaEmail" = $4
      WHERE "id" = $5
      AND EXISTS (SELECT 1
                  FROM "reminders" AS "r"
                  JOIN "projects" AS "p"
                  ON "r"."project_id" = "p"."id"
                  WHERE "r"."id" = $5
                  AND "p"."user_id" = $6);
    `;
    const params = [
      date,
      message,
      viaPhone,
      viaEmail,
      req.params.id,
      req.user.id
    ];

    pool.query(query, params)
      .then(results => {
        res.sendStatus(202);
      })
      .catch(error => {
        res.sendStatus(500);
        console.log('ERROR in PUT /api/reminder/id :', error);
      })
  } else {
    res.sendStatus(403);
  }
})

router.delete('/:id', (req, res) => {
  console.log('DELETE /api/reminder/id');
  if (req.isAuthenticated()) {

    const query = `
      DELETE FROM "reminders"
      WHERE "id" = $1
      AND EXISTS (SELECT 1
                  FROM "reminders" AS "r"
                  JOIN "projects" AS "p"
                  ON "r"."project_id" = "p"."id"
                  WHERE "r"."id" = $1
                  AND "p"."user_id" = "$2);
    `;
    const params = [
      req.params.id,
      req.user.id
    ]

    pool.query(query, params)
      .then(results => {
        res.sendStatus(202);
      })
      .catch(error => {
        res.sendStatus(500);
        console.log('ERROR in DELETE /api/reminder/id :', error);
      })
  } else {
    res.sendStatus(403);
  }
})


module.exports = router;