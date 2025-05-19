import { introStyles } from "../../styles/intro"
import { Text, View } from "react-native"

interface HeaderProps {
  text: string;
}


export const Header = ({text}: HeaderProps) => {
  return (
    <View style={introStyles.header}>
      <Text style={introStyles.headerText}>{text}</Text>
    </View>
  )
}