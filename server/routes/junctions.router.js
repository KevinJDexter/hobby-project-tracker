const router = require('express').Router();
const pool = require('../modules/pool');

router.post('/projectTechnology', (req, res) => {
  console.log('POST /projectTechnology');
  if (req.isAuthenticated()) {

    const projectId = req.body.projectId;
    const technologyId = req.body.technologyId;
    const technologyVersion = req.body.technologyVersion;

    const query = `
      INSERT INTO "projects_technologies_junction" (
        "project_id",
        "technology_id",
        "technology_version"
      )
      VALUES ($1, $2, $3)
      WHERE EXISTS (SELECT 1
                    FROM "projects"
                    WHERE "id" = $1
                    AND "user_id" = $4);
    `;
    const params = [
      projectId,
      technologyId,
      technologyVersion,
      req.user.id
    ];
    pool.query(query, params)
      .then(results => {
        res.sendStatus(201);
      })
      .catch(error => {
        res.sendStatus(500);
        console.log('ERROR in POST /projectTechnology');
      })
  } else {
    res.sendStatus(403);
  }
})

router.delete('/projectTechnology/project/:id', (req, res) => {
  console.log('DELETE /projectTechnology/project/:id');
  if (req.isAuthenticated()) {
    const query = `
      REMOVE FROM "projects_technologies_junction"
      WHERE "project_id" = $1
      AND EXISTS (SELECT 1
                  FROM "projects"
                  WHERE "id" = $1
                  AND "user_id" = $2);
    `;
    const params = [
      req.params.id,
      req.user.id
    ];
    pool.query(query, params)
      .then(results => {
        res.sendStatus(201);
      })
      .catch(error => {
        res.sendStatus(500);
        console.log('ERROR in DELETE /projectTechnology/project/:id');
      })
  } else {
    res.sendStatus(403);
  }
})

module.exports = router;