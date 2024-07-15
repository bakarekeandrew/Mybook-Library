import {Text, View } from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);


export default function App() {
  return (
    <PaperProvider>
      <StyledSafeAreaView className="flex-1 items-center justify-center">
        <StyledView>
          <StyledText>e start working on your app!</StyledText>
        </StyledView>
      </StyledSafeAreaView>
    </PaperProvider>
  );
}


