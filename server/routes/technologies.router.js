const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/all', (req, res) => {
  console.log('GET /api/technology/all');
  const query = `
    SELECT "id", "name"
    FROM "technologies";
  `;
  const params = [];
  pool.query(query, params)
    .then(results => {
      res.send(results.rows);
    })
    .catch(error => {
      res.sendStatus(500);
      console.log('ERROR in GET /api/technology/all :', error);
    })
})

router.get('/:projectId', (req, res) => {
  console.log('GET /api/technology/projectId');
  if (req.isAuthenticated()) {
    const query = `
    SELECT "t"."id", "t"."name", "ptj"."version"
    FROM "technologies" AS "t"
    JOIN "projects_technologies_junction" AS "ptj"
    ON "ptj"."technology_id" = "t"."id"
    JOIN "projects" AS "p"
    ON "ptj"."project_id" = "p"."id"
    WHERE "p"."id" = $1
    AND "p"."user_id" = $2;
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
        console.log('ERROR in GET /api/technology/projectId :', error);
      })
  } else {
    res.sendStatus(403);
  }
})

router.post('/', (req, res) => {
  console.log('POST /api/technology');
  if (req.isAuthenticated()) {
    const query = `
      INSERT INTO "technologies" (
        "name"
      )
      VALUES ($1)
      RETURNING "id"
    `;
    const params = [
      req.body.name
    ];
    pool.query(query, params)
      .then(results => {
        res.sendStatus(201);
      })
      .catch(error => {
        res.sendStatus(500);
        console.log('ERROR in POST /api/technology :', error);
      })
  } else {
    res.sendStatus(403);
  }
})


router.put('/:id', (req, res) => {
  console.log('PUT /api/technology/id');
  if (req.isAuthenticated()) {
    const query = `
      UPDATE "technologies"
      SET "name" = $1
      WHERE "id" = $2
      AND EXISTS (SELECT 1
                  FROM "projects_technologies_junction" AS "ptj"
                  JOIN "projects" AS "p"
                  ON "ptj"."project_id" = "p"."id"
                  WHERE "ptj"."technology_id" = $2
                  AND "p"."user_id" = $3)
    `;
    const params = [
      req.body.name,
      req.params.id,
      req.user.id
    ];
    pool.query(query, params)
      .then(results => {
        res.send(202);
      })
      .catch(error => {
        res.sendStatus(500);
        console.log('ERROR in PUT /api/technology/id :', error);
      })
  } else {
    res.sendStatus(403);
  }
})

router.delete('/:id', (req, res) => {
  console.log('DELETE /api/technology/id');
  if (req.isAuthenticated()) {
    const query = `
      DELETE FROM "technologies"
      WHERE "id" = $1
      AND EXISTS (SELECT 1
                  FROM "projects_technologies_junction" AS "ptj"
                  JOIN "projects" AS "p"
                  ON "ptj"."project_id" = "p"."id"
                  WHERE "ptj"."technology_id" = $1
                  AND "p"."user_id" = $2)
    `;
    const params = [
      req.params.id,
      req.user.id
    ];
    pool.query(query, params)
      .then(results => {
        res.sendStatus(202);
      })
      .catch(error => {
        res.sendStatus(500);
        console.log('ERROR in DELETE /api/technology/id :', error);
      })
  } else {
    res.sendStatus(403);
  }
})

module.exports = router;