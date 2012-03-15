zombie = require "zombie"
require "should"

describe 'journeys', ->
  browser = null

  beforeEach ->
#    {debug: true}
    browser = new zombie.Browser()

  describe 'test form submit', ->
    it 'should hit google', (done) ->
      browser.visit 'https://www.google.co.uk/m', ->
        browser.fill('input', 'Zombie.js').pressButton('Search', (err, browser) =>
          browser.location._url.href.should.equal 'https://www.google.co.uk/m?q=Zombie.js'
          done()
        )

  describe "log in process", ->

    it 'should re-direct a user', (done) ->
      browser.visit 'http://localhost:3000/', ->
       browser.location.pathname.should.equal '/not-logged-in'
       done()

    it 'should fill in the right form fields', (done) ->
      browser.visit "http://localhost:3000/not-logged-in/", ->
        browser
          .fill("#sign-up-email", "test@test.com")
          .fill("#sign-up-password", "test")
          .fill("#verify-password", "test")
        browser.querySelector('#sign-up-email').value.should.equal 'test@test.com'
        browser.querySelector('#sign-up-password').value.should.equal 'test'
        browser.querySelector('#verify-password').value.should.equal 'test'
        browser.querySelector('#sign-up-btn').type.should.equal 'submit'
        done()

#    it 'should sign a user up', (done) ->
#      browser.visit 'http://localhost:3000/not-logged-in', ->
#        browser.fill('#sign-up-email', 'test@test.com')
#          .fill('#sign-up-password', 'test')
#          .fill('#verify-password', 'test')
#          .fire('submit','form#sign-up-form', (err, browser) =>
#            browser.text("title").should.equal 'Moo.dalicio.us!'
#            done()
#          )

#  describe 'sign in process', ->
#    it 'should sign a user in', (done) ->
#      browser.visit 'http://localhost:3000/not-logged-in', ->
#        browser.fill('email', 'test@test.com')
#          .fill('password', 'test')
#          .pressButton('Sign in', (err, browser) ->
#            browser.text("title").should.equal 'Moo.dalicio.us!'
#            done()
#          )
#