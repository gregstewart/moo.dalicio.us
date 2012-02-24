class Project
  constructor: (@name, @date, @startDate, @endDate) ->
    @date = if (typeof @date == 'undefined') then new Date else @date
    @startDate = if (typeof @startDate == 'undefined') then null else @startDate
    @endDate = if (typeof @endDate == 'undefined') then null else @endDate
    @users = []

  getName: ->
    @name

  getDate: ->
    @date

  getStartDate: ->
    @startDate

  getEndDate: ->
    @endDate

  addUser: (user) ->
    @users.push(user)

  getUsers: ->
    @users

exports.Project = Project