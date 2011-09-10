$ ->
  client = new Faye.Client '/faye'

  client.subscribe '/chat', (message) ->
    console.log "received"
    ($ '.chatroom').append "<div>#{message.user}: #{message.message}</div>"

  client.callback () ->
    console.log "connected"

    publishChat = () ->
      client.publish '/chat', { message: 'yar!' }

    ($ "#chatform").submit ->
      client.publish "/chat", { user: ($ "#chatname").val(), message: ($ "#chatinput").val() }
      ($ "#chatinput").val ""

      false
      