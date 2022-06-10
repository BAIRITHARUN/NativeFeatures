import { FC } from 'react'
import { StyleSheet, Pressable, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/Colors'

type OutlinedButtonProps = {
    children: string
    icon: 'camera' |'location' |'map'
    onPress: () => void
}

const OutlinedButton: FC<OutlinedButtonProps> = (props: OutlinedButtonProps) => {
    return (
        <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={props.onPress}>
            <Ionicons
                style={styles.icon}
                name={props.icon}
                size={18} color={Colors.primary500} />
            <Text style={styles.text}>
                {props.children}
            </Text>
        </Pressable>
    )
}

export default OutlinedButton

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.primary500,

    },
    pressed: {
        opacity: 0.7
    },
    icon: {
        marginRight: 6,

    },
    text: {
        color: Colors.primary500,
        marginLeft: 6
    }
})