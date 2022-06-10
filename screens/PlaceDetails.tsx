import { FC, useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, ScrollView, Image, View, Text } from 'react-native'
import OutlinedButton from '../components/UI/OutlinedButton'
import { Colors } from '../constants/Colors'

import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { fetchplaceDetails } from '../util/database'
import Place from '../models/place'

type Props = NativeStackScreenProps<RootStackParamList, 'PlaceDetails'>

const PlaceDetails: FC<Props> = (props: Props) => {

    const [fetchedPlace, setFetchedPlace] = useState<Place | any>()

    const selectedPlaceId = props.route.params?.placeId

    useLayoutEffect(() => {
        async function getPlaceDetails(id: number) {
            const result = await fetchplaceDetails(id)
            setFetchedPlace(result)
            // console.log(result)
            if(result && result != 'unknown'){
                props.navigation.setOptions({
                    title: result.title
                })
            }
          
        }

        getPlaceDetails(selectedPlaceId)
    }, [selectedPlaceId])

    function showOnMapHandler() {

        const latLng = {
            lat: fetchedPlace.lat, 
            lng: fetchedPlace.lng
        }
        // console.log(latLng)
        props.navigation.navigate(
            'Map', {
                latLng: latLng
            }
        )
    }

    if (!fetchedPlace) {
        return (
            <View style={styles.fallback}>
                <Text>Loading place data...</Text>
            </View>
        )
    }

    return (
        <ScrollView>
            <Image
                source={{ uri: fetchedPlace.imageUri }}
                style={styles.image} />
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>
                        Address
                    </Text>
                </View>
                <OutlinedButton
                    icon='map'
                    onPress={showOnMapHandler}>
                    View on Map
                </OutlinedButton>
            </View>
        </ScrollView>
    )
}

export default PlaceDetails

const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screen: {
        alignItems: 'center',
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%'
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    }
})