describe 'basic user journey test', ->

  Browser = require 'zombie'
  jasmine = require 'jasmine-node'
  browser = new Browser()

  it 'should visit homepage', ->
    whenPageHasLoaded ->
      expect( browser.text('title') ).toBe('Express')
      jasmine.asyncSpecDone()

  whenPageHasLoaded = (callback) ->
    browser.visit('http://localhost:3000/', (error, browser) ->
      callback.call()
    )
    jasmine.asyncSpecWait()