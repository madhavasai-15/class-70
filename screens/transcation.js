import React from "react";
import { View , Text, TouchableOpacity, StyleSheet, Image, TextInput} from 'react-native';
import * as Permission from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class Transaction extends React.Component {
    constructor(){
        super();
        this.state = {
            hasCameraPermissions: null,
            buttonState: 'normal',
            scannedBookID: '',
            scannedStudentID: '',
            scanned: false,
        }
    }

    getCameraPermissions = async (id) => {
        const {status} = await Permission.askAsync(Permission.CAMERA);
        this.setState({
            hasCameraPermissions: status === 'granted', 
            buttonState: id,
            scanned: false,
        });
    }

    getData = async ({ type, data }) => {
        if(this.state.buttonState === 'bookId'){
            this.setState({
                scannedBookID: data,
                scanned: true,
                buttonState: 'normal',
            })
        }else if(this.state.buttonState === 'studentId'){
            this.setState({
                scannedStudentID: data,
                scanned: true,
                buttonState: 'normal',
            });
        }
    }
            

    render(){
        if(this.state.buttonState !== 'normal' && this.state.hasCameraPermissions){
            return (
                <BarCodeScanner onBarCodeScanned={this.state.scanned ? undefined : this.getData} style={StyleSheet.absoluteFillObject}/> 
            );
        }else if(this.state.buttonState === 'normal') {
            return (
                <View style = {styles.container}>
                    <View>
                        <Image source={require('../assets/booklogo.jpg')} style={{ width: 200, height: 200 }}/>
                        <Text style = {{textAlign: 'center', fontSize: 30}}> Online Library </Text>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput style={styles.inputBox}
                            value={this.state.scannedBookID}
                            placeholder={'Book id'}
                        />
                        <TouchableOpacity style={styles.QRbutton} onPress={() => this.getCameraPermissions('bookId')}>
                            <Text style={styles.QRtext}> Scan </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput style={styles.inputBox}
                            value={this.state.scannedStudentID}
                            placeholder={'Student id'}
                        />
                        <TouchableOpacity style={styles.QRbutton} onPress={() => this.getCameraPermissions('studentId')}>
                            <Text style={styles.QRtext}> Scan </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
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
    }, 
    inputView: {
        flexDirection: 'row',
        margin: 20
    },
    inputBox: {
        width: 200,
        height: 40,
        borderWidth: 1.5,
        
    }
});