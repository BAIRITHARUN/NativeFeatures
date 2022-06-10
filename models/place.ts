export default class Place {
    title: string
    imageUri: string
    // address: string
    location: { lat: number, lng: number } |{} |any
    id : number


    constructor(
        title: string, imageUri: string,
        location: 
        { lat: number, lng: number }|{},        
    id: number) {
        this.title = title
        this.imageUri = imageUri
        // this.address = address
        this.location = location
        this.id = id 
    }


}
