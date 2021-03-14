import fs from 'fs';

export function getImageFromBuffer(buffer) {
    const image = fs.writeFileSync("new-path.jpg", buffer)
    console.log('image', image)
    return image;
}

export function toBase64(arr) {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
        arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
}
