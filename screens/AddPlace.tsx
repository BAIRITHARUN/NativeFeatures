import {FC} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PlaceForm from '../components/Places/PlaceForm'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import IconButton from '../components/UI/IconButton'
import Place from '../models/place'
import { insertPlace } from '../util/database'
import Place1 from '../models/place1'

type Props = NativeStackScreenProps<RootStackParamList, 'AddPlace'>
// type AddPlacerops = {
    
// }

const AddPlace: FC<Props> = (props: Props)=> {

    async function createPlaceHandler (placeData: Place1) {
        await insertPlace(placeData)
        props.navigation.navigate('AllPlaces')
    }

    return (
        <PlaceForm onCreatePlace={createPlaceHandler}/>
    )
}

export default AddPlace

const style = StyleSheet.create({

})