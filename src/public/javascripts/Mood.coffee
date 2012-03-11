class Mood
    getMoods: (callback) ->
        $.ajax {
            type: "GET",
            url: "http://localhost:3000/get/moods/",
            contentType: "application/json; charset=utf-8"
            dataType: "json",
            success: callback,
            statusCode: {
                403: ->
                    # not logged on
            }
        }

window.Mood = Mood