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