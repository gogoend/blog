import fs from 'fs/promises'
import path from 'path'
import { get__dirname } from './legacyPath.ts'
import dayjs from 'dayjs'

const logDirPath = path.join(
  get__dirname(),
  '../log/'
)

const makeSureLogFolder = async () => {
  return fs.access(
    logDirPath
  ).catch(err => {
    if (err.code === 'ENOENT') {
      return fs.mkdir(logDirPath)
    } else {
      throw err
    }
  }).then(() => { }, err => {
    throw err
  })
}

export const writeLogLine = async (logName: string, content: string) => {
  await makeSureLogFolder()
  const lineWillBeWrite = `${[dayjs().format(), content].join('\t')}\n`
  await fs.writeFile(
    path.join(
      logDirPath, logName + '.log'
    ),
    lineWillBeWrite,
    {
      flag: 'a'
    }
  )
}

export const readLogFile = async (logName: string) => {
  return fs.readFile(
    path.join(
      logDirPath, logName + '.log'
    )
  ).then(fileContent => fileContent.toString(), err => {
    if (err.code === 'ENOENT') {
      return ''
    } else {
      throw err
    }
  })
}

export const consumeLogLines = async (logName: string, callback: ((arg: Array<{date: Date, content: string}>) => any)) => {
  const logContent = await readLogFile(logName)
  const lines = logContent.split('\n').filter(Boolean).map(line => {
    return {
      date: new Date(Number(dayjs(line.substring(0, 25)))),
      content: line.substring(26)
    }
  })
  callback(lines)
}