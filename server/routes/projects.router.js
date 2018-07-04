const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/all', (req, res) => {
  console.log('GET /api/project/all');
  if (req.isAuthenticated()) {
    const query = `
      SELECT *
      FROM "projects"
      WHERE "user_id" = $1;
    `;
    const params = [req.user.id];
    pool.query(query, params)
      .then(results => {
        res.send(results.rows);
      })
      .catch(error => {
        res.sendStatus(500);
        console.log('ERROR in GET /api/project/all :', error);
      })
  } else {
    res.sendStatus(403);
  }
})

router.post('/', (req, res) => {
  console.log('POST /api/project');
  if (req.isAuthenticated()) {

    const name = req.body.name;
    const erd = req.body.erd;
    const pma = req.body.pma;
    const scope = req.body.scope;
    const collaborators = req.body.collaborators;
    const website = req.body.website;
    const github = req.body.github;
    const date = req.body.date;

    const query = `
      INSERT INTO "projects" (
        "name",
        "erd",
        "project_management_app",
        "scope_document",
        "collaborators",
        "website",
        "github",
        "date_started",
        "user_id"
      )
      VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9 )
      RETURNING "id";
    `;
    const params = [
      name,
      erd,
      pma,
      scope,
      collaborators,
      website,
      github,
      date,
      req.user.id
    ];
    pool.query(query, params)
      .then(results => {
        res.sendStatus(201);
      })
      .catch(error => {
        res.sendStatus(500);
        console.log('ERROR in POST /api/project :', error);
      })
  } else {
    res.sendStatus(403);
  }
})

router.put('/:id', (req, res) => {
  console.log('PUT /api/project/id');
  if (req.isAuthenticated()) {
    
    const name = req.body.name;
    const erd = req.body.erd;
    const pma = req.body.pma;
    const scope = req.body.scope;
    const collaborators = req.body.collaborators;
    const website = req.body.website;
    const github = req.body.github;

    const query = `
      UPDATE "projects"
      SET
        "name" = $1,
        "erd" = $2,
        "project_management_app" = $3,
        "scope_document" = $4,
        "collaborators" = $5,
        "website" = $6,
        "github" = $7
      WHERE "id" = $8
      AND "user_id" = $9
    `;
    const params = [
      name,
      erd,
      pma,
      scope,
      collaborators,
      website,
      github,
      req.params.id,
      req.user.id
    ];
    pool.query(query, params)
      .then(results => {
        res.sendStatus(202);
      })
      .catch(error => {
        res.sendStatus(500);
        console.log('ERROR in PUT /api/project/id :', error);
      })
  } else {
    res.sendStatus(403);
  }
})

router.delete('/:id', (req, res) => {
  console.log('DELETE /api/project/id');
  if (req.isAuthenticated()) {
    const query = `
      DELETE FROM "projects"
      WHERE "id" = $1
      AND "user_id" = $2;
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
        console.log('ERROR in DELETE /api/project/id :', error);
      })
  } else {
    res.sendStatus(403);
  }
})

module.exports = router;
