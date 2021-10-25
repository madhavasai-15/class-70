import React from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Transaction from './screens/transcation';
import Search from './screens/search';

export default class App extends React.Component {
  render(){
    return (
      <AppContainer/>
    );
  }
}

const Navigator = createBottomTabNavigator({
  Transaction: {screen : Transaction},
  Search: {screen: Search},
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: () => {
      const routeName = navigation.state.routeName;

      if(routeName === 'Transaction'){
        return(<Image source = {require("./assets/book.png")} style = {{width: 40, height: 40}}/>)
      }else if(routeName === 'Search'){
        return(<Image source={require('./assets/searchingbook.png')} style={{ width: 40, height: 40 }}/>);
      }
    } 
  })
}
)

const AppContainer = createAppContainer(Navigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
