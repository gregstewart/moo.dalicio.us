describe 'basic user journey test', ->

  Browser = require 'zombie'
  jasmine = require 'jasmine-node'
  Browser.debug = true
  browser = new Browser()

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

  describe 'capture my mood', ->
    it 'should visit how I feel page', ->
      whenPageHasLoaded 'http://localhost:3000/how-are-you-feeling', ->
        expect( browser.text('title') ).toBe('How are you today?')
        jasmine.asyncSpecDone()

    it 'should have a slider element', ->
      whenPageHasLoaded 'http://localhost:3000/how-are-you-feeling', ->
        expect( browser.query('#slider') )
        jasmine.asyncSpecDone()

    it 'should submit my mood', ->
      whenPageHasLoaded 'http://localhost:3000/how-are-you-feeling', ->
        browser.pressButton 'input#save-me' , (error, browser) =>
          expect(browser.location.pathname).toBe('/save-my-mood')
          jasmine.asyncSpecDone()

  whenPageHasLoaded = (url, callback) ->
    browser.visit url, (error, browser) ->
      callback.call()

    jasmine.asyncSpecWait()