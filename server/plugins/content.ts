import readingTime from 'reading-time'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('content:file:afterParse', (file) => {
    if (file._extension === '.md') {
      const { text } = readingTime(file.text)
      console.log({ text })
      file.readingTime = text
      file.bodyPlainText = file.text
    }
  })
})
