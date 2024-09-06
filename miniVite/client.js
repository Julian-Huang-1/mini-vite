const ws = new WebSocket("ws:localhost:9527")

ws.addEventListener("open", ({ target: s }) => {
  console.log("connect!!!")
  s.addEventListener("message", ({ data }) => {
    console.log(data)
  })

  s.addEventListener("close", ({ data }) => {
    console.log("close")
  })
})
