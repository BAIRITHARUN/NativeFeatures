import { FC, useCallback, useState } from 'react'
import {
    StyleSheet, View,
    Text, ScrollView,
    TextInput
} from 'react-native'
import { Colors } from '../../constants/Colors'
import Place from '../../models/place'
import Place1 from '../../models/place1'
import Button from '../UI/Button'
import ImagePicker from './ImagePicker'
import LocationPicker from './LocationPicker'

type PlaceFormrops = {
    onCreatePlace: (placeData: Place1) => void
}

const PlaceForm: FC<PlaceFormrops> = (props: PlaceFormrops) => {

    const [enteredTitle, setEnteredTitle] = useState('')

    const [selectImahe, setSelectImage] = useState<string>('')
    const [pickedLocation, setPickedLocation] = useState<{ lat: number, lng: number } | {}>(
        {}
    )

    function changeTextHandler(enteredTitle: string) {
        setEnteredTitle(enteredTitle)
    }


    function onImageTaken(imageUri: string) {
        setSelectImage(imageUri)
    }

    const onLocationPick = useCallback((location: { lat: number, lng: number }) => {
        setPickedLocation(location)
    }, [])

    function savePlaceHandler() {
        const placeData = new Place1(
            enteredTitle, selectImahe, pickedLocation)
        props.onCreatePlace(placeData)
    }


    return (
        <ScrollView style={style.form}
            showsVerticalScrollIndicator={false}>
            <View>
                <Text style={style.label}>Title</Text>
                <TextInput
                    style={style.input}
                    onChangeText=
                    {changeTextHandler} />
            </View>
            <ImagePicker onImageTaken={onImageTaken} />
            <LocationPicker onLocationPick={onLocationPick} />
            <Button onPress={savePlaceHandler}>Add Place</Button>
        </ScrollView>
    )
}

export default PlaceForm

const style = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24
    }, label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    }
})