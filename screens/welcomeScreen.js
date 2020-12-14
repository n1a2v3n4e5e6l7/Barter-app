import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,Image,KeyboardAvoidingView,Modal,ScrollView} from 'react-native';
import * as firebase from 'firebase'
import db from '../config';
import SantaAnimation from '../Components/santa.js'
export default class LoginScreen extends React.Component {


    constructor(){
        super();
        this.state={
          emailId : '',
          password: '',
          FirstName:'',
          LastName:'',
          Adress:'',
          Contact:'',
          ConfirmPassword:'',
          isModalVisible:false
        }
      }
    
      login=(email,password)=>{
        
         firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
            return Alert.alert("login sucessful!!")
         })
         .catch((error)=>{
             var errorcode=error.code;
             var errormessage=error.message;
             return Alert.alert("login failed :-(!!")
         })
            
      }
      signup=(email,password,ConfirmPassword)=>{
        if(password != ConfirmPassword) {
          return Alert.alert("Password does not match")
        }else{
          firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
            db.collection("users").add({
              FirstName:this.state.FirstName,
              Lastname:this.state.LastName,
              Contact:this.state.Contact,
              emailId:this.state.emailid,
              address: this.state.address,
            
            })
            return Alert.alert("User added succesfully",'',[{text:'ok',onPress:()=>this.setState({"isModalVisible":false})}])
         })
         .catch((error)=>{
             var errorcode=error.code;
             var errormessage=error.message;
             return Alert.alert("login failed :-(")
         })
            
        }
       
     }
  showModal=()=>{
    return(
      <Modal animationType="fade" transparent = {true}visible = {this.state.isModalVisible}>
        <View style = {styles.modalContainer}>
        <ScrollView style = {{width:'100%'}}>
          <KeyboardAvoidingView style = {styles.KeyboardAvoidingView}>
            <Text style = {styles.modalTitle}>Registeration</Text>
            <TextInput style = {styles.formTextInput} placeholder = {'First Name'} maxLength = {8}
            onChangeText = {(text)=>{this.setState({FirstName:text})}}/>
            <TextInput style = {styles.formTextInput} placeholder = {'Last Name'} maxLength = {8}
            onChangeText = {(text)=>{this.setState({LastName:text})}}/>
            <TextInput style = {styles.formTextInput} placeholder = {'Contact info'} maxLength = {10}keyboardType = {"numeric"}
            onChangeText = {(text)=>{this.setState({Contact:text})}}/>
            <TextInput style = {styles.formTextInput} placeholder = {'Address'} multiline = {true}
            onChangeText = {(text)=>{this.setState({Adress:text})}}/>
            <TextInput style = {styles.formTextInput} placeholder = {'Email id'} keyboardType = {'email-address'}
            onChangeText = {(text)=>{this.setState({emailid:text})}}/>
            <TextInput style = {styles.formTextInput} placeholder = {'password'} secureTextEntry = {true}
            onChangeText = {(text)=>{this.setState({password:text})}}/>
            <TextInput style = {styles.formTextInput} placeholder = {'Confirm password'} secureTextEntry = {true}
            onChangeText = {(text)=>{this.setState({ConfirmPassword:text})}}/>
            <View style  = {styles.modalBlackButton}>
              <TouchableOpacity style = {styles.registerButton}
              onPress = {()=>{this.signup(this.state.emailId,this.state.password,this.state.ConfirmPassword)}}>
                <Text style = {styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
            </View>
            <View style  = {styles.modalBlackButton}>
              <TouchableOpacity style = {styles.cancelButton}
              onPress = {()=>{this.setState({"isModalVisible":false})}}>
                <Text style = {styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        </View>
      </Modal>
    )
  }
  render(){
      return(
        <KeyboardAvoidingView style = {{alignItems:'center',marginTop:20}}>
        <View>
          {this.showModal()}
          {/* <SantaAnimation/> */}
          <Text style={{textAlign: 'center', fontSize: 30}}>Book Santa</Text>
        </View>
        <View>
        <TextInput
          style={styles.loginBox}
          placeholder="abc@example.com"
          keyboardType ='email-address'
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />

        <TextInput
          style={styles.loginBox}
          secureTextEntry = {true}
          placeholder="enter Password"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
        </View>
        <View>
          <TouchableOpacity style={{height:30,width:90,borderWidth:1,marginTop:20,paddingTop:5,borderRadius:7}}
          onPress={()=>{this.login(this.state.emailId ,this.state.password)}}>
            <Text style={{textAlign:'center'}}>Login</Text>
          </TouchableOpacity>
         
          <TouchableOpacity style={{height:30,width:90,borderWidth:1,marginTop:20,paddingTop:5,borderRadius:7}}
          onPress={()=>{this.setState({isModalVisible:false})}}>
            <Text style={{textAlign:'center'}}>signup</Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>

      )
  }
}


const styles = StyleSheet.create({
  container:{
   flex:1,
   backgroundColor:'#F8BE85',
   alignItems: 'center',
   justifyContent: 'center'
 },
 profileContainer:{
   flex:1,
   justifyContent:'center',
   alignItems:'center',
 },
 title :{
   fontSize:65,
   fontWeight:'300',
   paddingBottom:30,
   color : '#ff3d00'
 },
 loginBox:{
   width: 300,
   height: 40,
   borderBottomWidth: 1.5,
   borderColor : '#ff8a65',
   fontSize: 20,
   margin:10,
   paddingLeft:10
 },
 KeyboardAvoidingView:{
   flex:1,
   justifyContent:'center',
   alignItems:'center'
 },
 modalTitle :{
   justifyContent:'center',
   alignSelf:'center',
   fontSize:30,
   color:'#ff5722',
   margin:50
 },
 modalContainer:{
   flex:1,
   borderRadius:20,
   justifyContent:'center',
   alignItems:'center',
   backgroundColor:"#ffff",
   marginRight:30,
   marginLeft : 30,
   marginTop:80,
   marginBottom:80,
 },
 formTextInput:{
   width:"75%",
   height:35,
   alignSelf:'center',
   borderColor:'#ffab91',
   borderRadius:10,
   borderWidth:1,
   marginTop:20,
   padding:10
 },
 registerButton:{
  width:200,
  height:40,
  alignItems:'center',
  justifyContent:'center',
  borderWidth:1,
  borderRadius:10,
  marginTop:30
},
 registerButtonText:{
   color:'#ff5722',
   fontSize:15,
   fontWeight:'bold'
 },
 cancelButton:{
   width:200,
   height:30,
   justifyContent:'center',
   alignItems:'center',
   marginTop:5,
 },
 cancelButtonText:{
  color:'red',
  fontSize:15,
  fontWeight:'bold'
},
 button:{
   width:300,
   height:50,
   justifyContent:'center',
   alignItems:'center',
   borderRadius:25,
   backgroundColor:"#ff9800",
   shadowColor: "#000",
   shadowOffset: {
      width: 0,
      height: 8,
   },
   shadowOpacity: 0.30,
   shadowRadius: 10.32,
   elevation: 16,
   padding: 10
 },
 buttonText:{
   color:'#ffff',
   fontWeight:'200',
   fontSize:20
 }
})
