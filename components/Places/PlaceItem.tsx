import { FC } from 'react'
import { StyleSheet, View, Pressable, Text, Image } from 'react-native'
import { Colors } from '../../constants/Colors'
import Place from '../../models/place'

type PlaceItemProps = {
    places: Place
    onSelect: (id: number) => void
}

const PlaceItem: FC<PlaceItemProps> = (props: PlaceItemProps) => {
    return (
        <Pressable
            style = {({pressed}) => [styles.item, pressed && styles.pressed]}
            onPress={props.onSelect.bind(this, props.places.id)}>
            <Image 
            style={styles.image}
            source={{ uri: props.places.imageUri }} />
            <View style={styles.info}>
                <Text style={styles.title}>
                    {props.places.title}
                </Text>
                <Text style={styles.address}>
                    {props.places.location.lat}
                    {props.places.location.lng}
                </Text>
            </View>
        </Pressable>
    )
}

export default PlaceItem

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 6,
        marginVertical: 12,
        backgroundColor: Colors.primary500,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
    },
    pressed: {
        opacity: 0.9
    },
    image: {
        flex: 1,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        height: 100
    },
    info: {
        flex: 2,
        padding: 12
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.gray700
    },
    address: {
        fontSize: 12,
        color: Colors.gray700
    }
})