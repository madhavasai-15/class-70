import React from "react";
import { View , Text, TouchableOpacity, StyleSheet} from 'react-native';
import * as Permission from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class Transaction extends React.Component {
    constructor(){
        super();
        this.state = {
            hasCameraPermissions: null,
            buttonState: 'normal',
            scannedData: '',
            scanned: false,
        }
    }

    getCameraPermissions = async () => {
        const {status} = await Permission.askAsync(Permission.CAMERA);
        this.setState({
            hasCameraPermissions: status === 'granted', 
            buttonState: 'clicked',
            scanned: false,
        });
    }

    getData = async ({ type, data }) => {
        this.setState({
            scannedData: data,
            scanned: true,
            buttonState: 'normal',
        });


    }

    render(){
        if(this.state.buttonState === 'clicked' && this.state.hasCameraPermissions){
            return (
                <BarCodeScanner onBarCodeScanned={this.state.scanned ? undefined : this.getData} style={StyleSheet.absoluteFillObject}/> 
            );
        }else if(this.state.buttonState === 'normal') {
            return (
                <View style = {styles.container}>
                    <Text> {this.state.hasCameraPermissions ? this.state.scannedData : 'Requesting Camera Permission!'} </Text>
                    <TouchableOpacity style={styles.QRbutton} onPress={this.getCameraPermissions}>
                        <Text style={styles.QRtext}> Scan QR </Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
}

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    QRbutton: {
        backgroundColor: '#2196F3',
        margin: 10,
        padding: 10
    },
    QRtext: {
        fontSize: 20,
    }
});