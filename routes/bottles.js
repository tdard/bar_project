'use strict';
const Express = require('express');
const Joi = require('joi');
const Celebrate = require('celebrate');

const DB = require('../db.js');

const router = Express.Router();

router.get('/', (req, res, next) => {

    console.log('GET /bottles');
    DB.all('SELECT * FROM BOTTLES', (err, data) => {
        if (err) {
            return next(err);
        }
        return res.json(data);
    });
});

router.get('/:id', (req, res, next) => {
    console.log("GET /bottles/" + req.params.id);
    DB.get('SELECT * FROM BOTTLES WHERE ID = ?', [req.params.id], (err, data) => {
        if (err) {
            return next(err);
        }
        return res.json(data);
    });
});
/*
router.post('/', Celebrate.celebrate(
    {
        body: Joi.object().keys({
            brand: Joi.string().required(),
            price: Joi.number().integer().required(),
            volume: Joi.number().integer().required(),
            number:Joi.number().integer().required(),
        })
    }
    ),
    (req, res, next) => {

        console.log('INSERT new bottle ' + req.body.title);
        DB.run('INSERT INTO BOTTLES (TITLE, CONTENT) VALUES (?, ?)', [req.body.title, req.body.content], (err) => {

            if (err) {
                return next(err);
            }
            res.status(201);
            res.end();
        });
    });

router.patch('/:id', (req, res, next) => {

    DB.run('UPDATE BOTTLES SET TITLE=?, CONTENT=? WHERE ID = ?', [req.body.title, req.body.content, req.params.id], (err) =>{

        if (err) {
            return next(err);
        }
        res.end();
    });
});

router.delete('/:id', (req, res, next) => {

    DB.run('DELETE FROM BOTTLES WHERE ID = ?', [req.params.id], (err) => {

        if (err) {
            return next(err);
        }
        return res.end();
    });
});
*/

module.exports.router = router;
