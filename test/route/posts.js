'use strict';
const Code = require('code');
const expect = Code.expect;
const Lab = require('lab');
const lab  = module.exports.lab = Lab.script();

const Supertest = require('supertest');
const Express = require('express');
const PostRouter = require('../../routes/posts.js').router;
const DB = require('../../db.js');

const describe = lab.describe;
const it = lab.it;

describe('posts', () => {

    describe('list', () => {

        it('should return the list of posts in database', (done) => {

            DB.initAll('posts.list');
            const app = Express();
            app.use('/posts', PostRouter);
            Supertest(app)
                .get('/posts')
                .end((err, response) => {

                    if (err) {
                        return done(err);
                    }

                    const body = response.body;

                    expect(body).to.be.an.array();
                    expect(body).to.have.length(2);
                    done();
                });
        });
        
        it('should return the post 1 in database', (done) => {

            DB.initAll('posts.list');
            const app = Express();
            app.use('/posts', PostRouter);
            Supertest(app)
                .get('/posts/1')
                .end((err, response) => {

                    if (err) {
                        return done(err);
                    }

                    const body = response.body;

                    
                    expect(body).to.have.length(3);
                    expect(body.ID).to.be.a.number();
                    expect(body.TITLE).to.be.a.string();
                    expect(body.CONTENT).to.be.a.string();
                    done();
                });
        });
        
    });
});

