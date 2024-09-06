import http from "http"
import color from "picocolors"
import connect from "connect"
import { indexHTMLMiddleware, replaceImportMiddleware } from "./middlewares"

import { WebSocketServer } from "ws"

const { PORT_HTTP, PROJECT_NAME, PORT_WS } = process.env
const middleware = connect()

const createWSServer = () => {
  const server = new WebSocketServer({ port: PORT_WS })
  server.on("connection", (ws) => {
    console.log(color.green("websocket connect !!!"))
    ws.send("ws-miniVite connect!!")
    ws.on("message", (data) => {
      console.log("received: %s", data)
    })
  })
}

replaceImportMiddleware(replaceImportMiddleware)
middleware.use(indexHTMLMiddleware)

export function createServer() {
  http.createServer(middleware).listen(PORT_HTTP)
  createWSServer()
  console.log(
    `${color.green(PROJECT_NAME)} server on!! ${color.blue(
      `http://localhost:${PORT_HTTP}`
    )}`
  )
}

createServer()
