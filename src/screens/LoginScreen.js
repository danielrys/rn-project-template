// @flow
import React from "react"
import { SafeAreaView, StyleSheet } from "react-native"
import { connect } from "react-redux"
import i18n from "i18n-js"

// components
import { RoundedButton } from "../components"
import { Colors } from "../themes"

// redux
import { onTokenRequest } from "../redux/AuthRedux"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
})

type LoginScreenProps = {
  onTokenRequest: typeof onTokenRequest,
}

class LoginScreen extends React.PureComponent<LoginScreenProps> {
  render() {
    const { onTokenRequest } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <RoundedButton onPress={() => onTokenRequest()}>
          {i18n.t("authScreen.loginButton")}
        </RoundedButton>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
})

const mapDispatchToProps = {
  onTokenRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen)
