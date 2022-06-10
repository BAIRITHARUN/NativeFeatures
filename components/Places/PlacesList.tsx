import { useNavigation } from '@react-navigation/native'
import { FC } from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { Colors } from '../../constants/Colors'
import Place from '../../models/place'
import PlaceItem from './PlaceItem'

type PlacesListProps = {
    places: Place[]
}

const PlacesList: FC<PlacesListProps> = (props: PlacesListProps)=> {
    
    const navigation = useNavigation<'PlaceDetails'| any>();

    function selectPlaceHandler(id: number) {
        navigation.navigate('PlaceDetails', {placeId: id})
    }

    if(!props.places || props.places.length === 0){
        return (
            <View style={style.fallbackContainer}>
                <Text style={style.fallbackText}>No places added yet - start adding some!</Text>
            </View>
        )
    }
    
    return (
        <View>
            <FlatList style={style.list}
                data={props.places}
                keyExtractor={(item) => item.id?.toString()}
                renderItem={({item}) => {
                    return (
                        <PlaceItem
                            onSelect={selectPlaceHandler} 
                            places={item}/>
                    )
                }}
            />
        </View>
    )
}

export default PlacesList

const style = StyleSheet.create({
    list: {
        margin: 24
    },
    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200
    }
})