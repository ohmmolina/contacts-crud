export function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = () => resolve(fileReader.result as string)
    fileReader.onerror = (error) => reject(error)
    fileReader.readAsDataURL(file)
  })
}
export function getBase64ImageFromURL(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.setAttribute('crossOrigin', 'anonymous')

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0)
      const dataURL = canvas.toDataURL('image/png')
      resolve(dataURL)
    }
    img.onerror = (error) => {
      reject(error)
    }
    img.src = url
  })
}
