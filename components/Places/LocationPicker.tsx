import { FC, useEffect, useState } from 'react'
import { StyleSheet, View, Text, Alert, Image } from 'react-native'
import { Colors } from '../../constants/Colors'
import OutlinedButton from '../UI/OutlinedButton'
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native'

import {
    getCurrentPositionAsync,
    useForegroundPermissions,
    PermissionStatus
} from 'expo-location'
// import { getMapPreview } from '../../util/mocation'
import MapView,{Marker} from 'react-native-maps'


type LocationPickerProps = {
    onLocationPick: (location: {lat:number, lng: number}) => void
}

const LocationPicker: FC<LocationPickerProps> = (props: LocationPickerProps) => {

    const [pickedLocation, setPickedLocation] = useState<{ lat: number, lng: number }>()

    const [locationPermissionInfo, requestPermission] = useForegroundPermissions()

    const navigation = useNavigation<'Map' | any>()
    const route:any = useRoute()
    const iFocused = useIsFocused()

    

    useEffect(()=> {
        if(iFocused && route.params){
            const mapPickedLocation = {
                lat: route.params.pickedLat,
                lng: route.params.pickedLng
            }
            if(mapPickedLocation){
                setPickedLocation(mapPickedLocation)
                // props.onLocationPick(mapPickedLocation)
            }
        }
       
    },[route, iFocused])

    useEffect(()=> {
        if(pickedLocation?.lat && pickedLocation.lng){
            props.onLocationPick(pickedLocation)
        }
        
    },[pickedLocation, props.onLocationPick])


    async function verifyPermissions() {
        if (locationPermissionInfo?.status
            === PermissionStatus.UNDETERMINED) {
            const perimissionResponse = await requestPermission();
            return perimissionResponse.granted;
        }
        if (locationPermissionInfo?.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permission!', 'You need to grant camera permissions to use this app')
            return false;
        }

        return true;
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }
        const location = await getCurrentPositionAsync()
        console.log(location)
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
    }

    function pickOnMapHandler() {
        navigation.navigate('Map')
    }

    let locationPreview = <Text>No location picked yet.</Text>

    if (pickedLocation) {
        const region = {
            latitude: pickedLocation.lat,
            longitude: pickedLocation.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }
        locationPreview = (
            <MapView
                style={styles.image}
                initialRegion={region}
                region={region}
            >
                <Marker
                    coordinate={{
                        latitude: pickedLocation.lat,
                        longitude: pickedLocation.lng
                    }}
                    title={"title"}
                    description={"description"}
                />
            </MapView>


        )
    }

    {/*
        <Image
                    style={styles.image}
                    source={{ uri: getMapPreview() }} />*/}
    return (
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutlinedButton
                    icon='location'
                    onPress={getLocationHandler}>
                    Locate User
                </OutlinedButton>
                <OutlinedButton
                    icon='map'
                    onPress={pickOnMapHandler}>
                    Pick on Map
                </OutlinedButton>
            </View>
        </View>
    )
}

export default LocationPicker

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    }
})