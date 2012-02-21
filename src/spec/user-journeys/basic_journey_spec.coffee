describe 'basic user journey test', ->

  Browser = require 'zombie'
  jasmine = require 'jasmine-node'
  #Browser.debug = true
  browser = new Browser()

  describe 'visit log in/sign up page', ->

    it 'visit the not logged in page', ->
      whenPageHasLoaded 'http://localhost:3000/not-logged-in', ->
        expect( browser.text('title') ).toBe('Not looged in')
        jasmine.asyncSpecDone()

    it 'should redirect to log in if not logged in', ->
      whenPageHasLoaded 'http://localhost:3000/', ->
        expect(browser.location.pathname).toBe('/not-logged-in')
        jasmine.asyncSpecDone()

    describe 'login process', ->
      it 'should visit the signin page', ->
        whenPageHasLoaded 'http://localhost:3000/not-logged-in', ->
          browser.pressButton 'button#sign-in-btn' , (error, browser) =>
            expect(browser.location.pathname).toBe('/sign-in')
            jasmine.asyncSpecDone()

    describe 'signup process', ->
      it 'should visit the signup page', ->
        whenPageHasLoaded 'http://localhost:3000/sign-up', ->
          expect( browser.text('title') ).toBe('Sign up process')
          jasmine.asyncSpecDone()

  describe 'visit the homepage', ->
    it 'should visit homepage', ->
      whenPageHasLoaded 'http://localhost:3000/', ->
        expect( browser.text('title') ).toBe('What\s my mood??')
        jasmine.asyncSpecDone()

    it 'should have a link to take me to capture my mood', ->
      whenPageHasLoaded 'http://localhost:3000/', ->
        expect( browser.text('a:last') ).toBe('How are you feeling today?')
        jasmine.asyncSpecDone()

    it 'clicking on the link should take you to the slider page', ->
      whenPageHasLoaded 'http://localhost:3000/', ->
        browser.clickLink 'a:last', (error, browser) =>
          expect(browser.location.pathname).toBe('/how-are-you-feeling')
          jasmine.asyncSpecDone()

  describe 'creating a project', ->
    it 'should visit the create project page', ->
      whenPageHasLoaded 'http://localhost:3000/create-project', ->
        expect( browser.text('title') ).toBe('Create project')
        jasmine.asyncSpecDone()

  describe 'capture my mood', ->
    it 'should visit how I feel page', ->
      whenPageHasLoaded 'http://localhost:3000/how-are-you-feeling', ->
        expect( browser.text('title') ).toBe('How are you today?')
        jasmine.asyncSpecDone()

    it 'should have a slider element', ->
      whenPageHasLoaded 'http://localhost:3000/how-are-you-feeling', ->
        expect( browser.query('#slider') )
        jasmine.asyncSpecDone()

    #it 'should submit my mood', ->
    #  whenPageHasLoaded 'http://localhost:3000/how-are-you-feeling', ->
    #    browser.pressButton 'input#save-me' , (error, browser) =>
    #      expect(browser.location.pathname).toBe('/save-my-mood')
    #      jasmine.asyncSpecDone()

  whenPageHasLoaded = (url, callback) ->
    browser.visit url, (error, browser) ->
      callback.call()

    jasmine.asyncSpecWait()