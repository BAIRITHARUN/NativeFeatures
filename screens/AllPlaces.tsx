import {FC, useEffect, useState} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PlacesList from '../components/Places/PlacesList'

import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import {RootStackParamList} from '../App'
import { useIsFocused } from '@react-navigation/native'
import Place from '../models/place'
import { fetchplaces } from '../util/database'

type Props = NativeStackScreenProps<RootStackParamList, 'AllPlaces'>

const AllPlaces: FC<Props> = (props: Props)=> {

    const [loadedPlaces, setLoadedPlaces] = useState<Place[] | any>()
    const isFocused = useIsFocused()
    useEffect(()=> {
        async function loadPlaces() {
            const places = await fetchplaces()
            setLoadedPlaces(places)
        }
        if(isFocused){
            loadPlaces()
            //const place: any = props.route.params.place
            // setLoadedPlaces(curPlaces => [...curPlaces, place])
        }
    }, [isFocused])

    return (
        <PlacesList places={loadedPlaces}/>
    )
}

export default AllPlaces

const style = StyleSheet.create({

})