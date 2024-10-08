import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';


const styles = StyleSheet.create({
    input: {
        color: colors.black,
        backgroundColor: colors.lightGray,
        paddingHorizontal: 22,
        paddingVertical: 7,
        borderRadius: 10,
        marginVertical: 12,
        fontSize: 15,
    },
    outlined: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.black,
        marginHorizontal: 24,
    },
});

export default styles;
