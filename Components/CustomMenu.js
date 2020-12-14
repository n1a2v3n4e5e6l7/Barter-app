import React from 'react';
import {StyleSheet,Text,View,TouchableOpacity} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import firebase from 'firebase';
export default class CustomMenu extends React.Component{
    render(){
        return(
            <View style = {{flex:1}}>
                <View style = {styles.DrawerItemsconatainer}>
        <DrawerItems{...this.props}/>
                </View>
                <View style = {styles.logoutContainer}>
                    <TouchableOpacity style = {styles.logoutButton}
                    onPress = {()=>{{
                        this.props.navigation.navigate('LoginScreen');
                        firebase.auth().signOut()}}}>
                        <Text style = {styles.TextStyle}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
var styles = StyleSheet.create({
   DrawerItemsconatainer: {
       flex:0.8,
   },
   logoutContainer:{
       flex:0.2,
       justifyContent:"flex-end",
       paddingBottom:30
   },
   logoutButton:{
       height:30,
       width:'100%',
       justifyContent:'center',
       padding:10
   },
   TextStyle:{
       fontSize:30,
       fontWeight:'bold'
   }
})