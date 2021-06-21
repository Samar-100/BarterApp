import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import firebase from "firebase";
import db from "../config";
// import SantaAnimation from "../components/SantaClaus";

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      password: "",
      isModalVisible: false,
      firstName: "",
      lastName: "",
      contact: "",
      address: "",
      confirmPassword: "",
    };
  }

  userSignUp = (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert("password doesnt match");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          db.collection("users").add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            contact: this.state.contact,
            emailId: this.state.emailId,
            address: this.state.address,
          });
          return Alert.alert("User added sucessfully", "", [
            {
              text: "ok",
              onPress: () => this.setState({ isModalVisible: false }),
            },
          ]);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
          // ..
        });
    }
  };

  showModal = () => {
    console.log(this.state.isModalVisible);
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={{ width: "100%" }}>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text style={styles.modalTitle}>Registration</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder={"First Name"}
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({ firstName: text });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"Last Name"}
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({ lastName: text });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"Contact"}
                maxLength={10}
                onChangeText={(text) => {
                  this.setState({ contact: text });
                }}
                keyboardType={"numeric"}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"Address"}
                multiline={true}
                onChangeText={(text) => {
                  this.setState({ address: text });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"Email"}
                onChangeText={(text) => {
                  this.setState({ emailId: text });
                }}
                keyboardType={"email.address"}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"Password"}
                onChangeText={(text) => {
                  this.setState({ password: text });
                }}
                secureTextEntry={true}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"Confirm Password"}
                onChangeText={(text) => {
                  this.setState({ confirmPassword: text });
                }}
                secureTextEntry={true}
              />
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() => {
                    this.userSignUp(
                      this.state.emailId,
                      this.state.password,
                      this.state.confirmPassword
                    );
                  }}
                >
                  <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    this.setState({ isModalVisible: false });
                  }}
                >
                  <Text style={{ color: "#ff5722" }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  userLogin = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        return Alert.alert("successfully logined");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View>{this.showModal()}</View>
        <View style={styles.profileContainer}>
          <Text style={styles.title}>Barter</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextInput
            style={styles.loginBox}
            placeholder="abc@example.com"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({ emailId: text });
            }}
          />
          <TextInput
            style={styles.loginBox}
            placeholder="Enter Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.userLogin(this.state.emailId, this.state.password);
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({ isModalVisible: true });
            }}
          >
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9E2B0",
    width: 400,
  },

  profileContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },

  loginBox: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor: "#ff8065",
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
  },

  title: {
    fontSize: 65,
    fontWeight: "300",
    paddingBottom: 30,
    color: "#ff3d00",
  },

  button: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
    marginLeft: 15,
  },

  buttonText: {
    color: "#ff3d00",
    fontWeight: "200",
    fontSize: 20,
  },

  KeyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalTitle: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 30,
    color: "#ff5722",
    margin: 50,
  },

  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginRight: 30,
    marginLeft: 30,
    marginBottom: 80,
    marginBottom: 80,
  },

  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#ffab91",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },

  registerButton: {
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
  },

  registerButtonText: {
    color: "#ff5722",
    fontSize: 15,
    fontWeight: "bold",
  },

  cancelButton: {
    width: 200,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
});
