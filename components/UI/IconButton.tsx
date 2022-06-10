import { FC } from 'react'
import { StyleSheet, Pressable, View, Text } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

type IconButtonProps = {
    name: 'star' | 'add' |'save',
    size: number,
    color: string | undefined,
    onPress: () => void
}

const IconButton: FC<IconButtonProps> = (props: IconButtonProps) => {
    return (
        <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={props.onPress}>
            <Ionicons
                name={props.name}
                size={props.size}
                color={props.color} />
        </Pressable>
    )
}

export default IconButton

const styles = StyleSheet.create({
    button: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pressed: {
        opacity: 0.7
    }
})