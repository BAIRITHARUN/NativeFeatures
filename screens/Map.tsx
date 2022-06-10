import { FC, useCallback, useLayoutEffect, useState } from 'react'
import { StyleSheet, Alert, View, Text } from 'react-native'

import MapView, { MapEvent, Marker } from 'react-native-maps'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import IconButton from '../components/UI/IconButton'

type Props = NativeStackScreenProps<RootStackParamList, 'Map'>

const Map: FC<Props> = (props: Props) => {

    const initialLocation = {
        lat: (props.route.params && props.route.params.latLng.lat) && props.route.params.latLng.lat,
        lng: (props.route.params && props.route.params.latLng.lng) && props.route.params.latLng.lng,
    }


    const [selectedLocation, setSelectedLocation] = useState<{
        lat: number,
        lng: number
    }>(initialLocation)

    // console.log(selectedLocation)

    const region = {
        latitude: (initialLocation && initialLocation.lat) ? initialLocation.lat : 37.78,
        longitude: (initialLocation && initialLocation.lng) ? initialLocation.lng : -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }


    function selectLocationHandler(event: MapEvent) {
        const lat = event.nativeEvent.coordinate.latitude
        const lng = event.nativeEvent.coordinate.longitude

        setSelectedLocation({ lat: lat, lng: lng })
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert('No location picked!',
                'You have to pick a location (by tapping on the map) first! ')
            return;
        }

        props.navigation.navigate('AddPlace',
            {
                pickedLat: selectedLocation.lat,
                pickedLng: selectedLocation.lng
            })
    }, [props.navigation, selectedLocation]);

    useLayoutEffect(() => {
        // console.log(initialLocation)
        if (initialLocation && initialLocation.lat && initialLocation.lng) {
            return;
        }
        props.navigation.setOptions({
            headerRight: ({ tintColor }) => {
                return <IconButton
                    name='save'
                    size={24}
                    color={tintColor}
                    onPress={savePickedLocationHandler}
                />
            }
        })
    }, [props.navigation, savePickedLocationHandler, initialLocation])

    return (
        <MapView style={styles.map}
            initialRegion={region}
            onPress={selectLocationHandler}>
            {selectedLocation && selectedLocation.lat && selectedLocation.lng &&
                <Marker

                    // pickedLocation={"Picked Location"}
                    coordinate={{
                        latitude: selectedLocation?.lat,
                        longitude: selectedLocation?.lng
                    }} />
            }
        </MapView>
    )
}

export default Map

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})