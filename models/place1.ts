
export default class Place1 {
    title: string
    imageUri: string
    // address: string
    location: { lat: number, lng: number } |{} |any

    constructor(
        title: string, imageUri: string,
        location: 
        { lat: number, lng: number }|{}) {
            
        this.title = title
        this.imageUri = imageUri
        // this.address = address
        this.location = location
    }
}