import Header from './src/components/Header/index';
import { View } from 'react-native'
import TodoList from "./src/components/TodoList/index";

export default function App() {
  return (
      <View style={{ flex: 1 }}>
        <Header />
          <TodoList />
      </View>
  );
}