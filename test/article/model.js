/**
 * Module dependencies.
 */
var should = require('should'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Mensaje = mongoose.model('Mensaje');

//Globals
var user;
var article;

//The tests
describe('<Unit Test>', function() {
    describe('Model Mensaje:', function() {
        beforeEach(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function(err) {
                article = new Mensaje({
                    title: 'Mensaje Title',
                    content: 'Mensaje Content',
                    user: user
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return article.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without title', function(done) {
                article.title = '';

                return article.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            Mensaje.remove({});
            User.remove({});
            done();
        });
        after(function(done){
            Mensaje.remove().exec();
            User.remove().exec();
            done();
        });
    });
});
