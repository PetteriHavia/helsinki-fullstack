import { Text as NativeText, StyleSheet } from "react-native"
import theme from "./theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary
  },
  colorPrimary: {
    color: theme.colors.primary
  },
  colorError: {
    color: theme.colors.error
  },
  colorWhite: {
    color: theme.colors.white
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading
  },
  fontSizeHeading: {
    fontSize: theme.fontSizes.heading
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold
  },
  textBackground: {
    backgroundColor: theme.colors.primary
  }
})

const Text = ({ color, fontSize, fontWeight, textBackground, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'error' && styles.colorError,
    color === 'white' && styles.colorWhite,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontSize == 'heading' && styles.fontSizeHeading,
    fontWeight === 'bold' && styles.fontWeightBold,
    textBackground === 'blue' && styles.textBackground,
    style,
  ]
  return <NativeText style={textStyle} {...props} />
}

export default Text