import { getFilePathAndContentType } from "./utils"
import path from "path"

const replaceImportMiddleware = (req, res, next) => {
  next()
}

const indexHTMLMiddleware = async (req, res) => {
  console.log(req.url)
  const { filePath, contentType } = getFilePathAndContentType(req.url)
  const file = Bun.file(filePath)
  let content = await file.text()

  if (path.basename(filePath) === "index.html") {
    const regex = /(<head>)([\s\S]*?<\/head>)/i
    const match = content.match(regex)
    const clientScript = ` <script type="module" src="miniVite/client.js"></script>`

    if (match) {
      content = content.replace(match[0], match[1] + clientScript + match[2])
    }
  }

  res.writeHead(200, { "Content-Type": contentType })
  res.end(content)
}

export { indexHTMLMiddleware, replaceImportMiddleware }
