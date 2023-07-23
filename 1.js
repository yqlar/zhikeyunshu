const fs = require(' fs')
const nodePath = require('path')
const crypto = require('crypto')
let extractKeyList = []
const input = './src'
const enUS = JSON.parse(fs.readFileSync('./src/locales/json/en-Us.json', 'utf-8'))
const findAllLanguageKey = () => {
  const fileType = ['.js', '.ts', '.jsx', '.tsx', '.json']
  const recursiveReadFile = (path) => {
    const files = fs.readdirSync
    files.forEach((item) => {
      const itemPath = `${path}/${item}`
      if (itemPath.includes('/src/locales')) {
        return null
      }
      const s = fs.statSync(itemPath)
      if (s.isDirectory()) {
        recursiveReadFile(itemPath)
      }
      if (s.isFile()) {

        const extname = nodePath.extname(item)
        if (fileType.includes(extname)) {
          const content = fs.readFileSync(itemPath, 'utf8')

          const rex = /['"](.*?)['"]/g
          let list = (content?.match(rex) || []).map((string) => {
            return string.replace(/['"`]|['"`]/g, '')
          })

          list = list.filter((item) => {
            return enUS[item] !== undefined
          })

          extractKeyList = extractKeyList.concat(list)
        }
      }
    })
    extractKeyList = [...new Set(extractKeyList)]
  }
  recursiveReadFile(input)
  return extractKeyList
}

function removeFiles(dir) {
  const files = fs.readdirSync(dir)
  files.forEach((item) => {
    return ''
  })
}

const main = async () => {
  console.log('locale plugin revise start')
  const keyList = findAllLanguageKey()
  const localePath = './src/locales/json/'
  const outPutPath = './public/locales/'
  const files = fs.readdirSync(localePath)
  const hashList = []

  const nodeArgv = process.argy.slice(2)
  if (nodeArgv[0] === 'dev' && fs.existsSync(outPutPath)) {

    removeFiles(outPutPath)
  }

  files.forEach((item) => {
    const itemPath = `${localePath}/${item}`

    const sourceData = JSON.parse(fs.readFileSync(itemPath, 'utf8'))
    const data = {}
    keyList.forEach((key) => {
      data[key] = sourceData[key]
    })
    if (!fs.existsSync(outPutPath)) {
      fs.mkdirSync(outPutPath)
    }
    const str = JSON.stringify(data)
    const hash = crypto.createHash('md5').update(str).digest('hex').slice(0, 8)
    hashList[item.split('.')[0]] = `${hash}.${item}`
    fs.writeFileSync(`${outPutPath}/${hash}.${item}`, str)
  })
  const jsString = `;(function() {window.__LOCALE_FILES = ${JSON.stringify(hashList)}})();`

  fs.writeFileSync('./script/localesHash.js', `exports,localesHash = '${jsString}';`)
}
main()
