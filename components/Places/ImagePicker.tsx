import { FC, useState } from 'react'
import {
    StyleSheet, View,
    Text, Button, Alert,
    Image
} from 'react-native'

import {
    launchCameraAsync, useCameraPermissions,
    PermissionStatus, ImageInfo, ImagePickerResult
} from 'expo-image-picker'
import { Colors } from '../../constants/Colors'
import OutlinedButton from '../UI/OutlinedButton'

type ImagePickerProps = {
    onImageTaken: (imageUri: string) => void
}

const ImagePicker: FC<ImagePickerProps> = (props: ImagePickerProps) => {

    const [cameraPermissionInfo, requestPermission] = useCameraPermissions()
    const [pickedImage, setPickedImage] = useState<string>('')

    async function verifyPermissions() {
        if (cameraPermissionInfo?.status
            === PermissionStatus.UNDETERMINED) {
            const perimissionResponse = await requestPermission();
            return perimissionResponse.granted;
        }
        if (cameraPermissionInfo?.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permission!', 'You need to grant camera permissions to use this app')
            return false;
        }

        

        return true;
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();
        
        if (!hasPermission) {
            return;
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });

        if (image.cancelled === false) {
            setPickedImage(image.uri)
            props.onImageTaken(image.uri)
        }

    }

    let imageView = <Text>No image taken yet.</Text>

    if (pickedImage) {
        imageView = <Image style={styles.image}
            source={{ uri: pickedImage }} />
    }

    return (
        <View>
            <View style={styles.imagePreview}>
                {imageView}
            </View>

            <OutlinedButton
                icon='camera'
                onPress={takeImageHandler}>
                    Take Image
            </OutlinedButton>
        </View>
    )
}

export default ImagePicker

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    image: {
        width: '100%',
        height: '100%'
    }
})