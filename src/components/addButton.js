import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../global/colors'; // Ensure that colors are correctly used in Tailwind

const AddButton = ({
    title = "",
    onPress = () => {},
    color = colors.gray500, // Ensure this color is compatible with Tailwind colors
}) => {
    return (
        <Pressable
            className={`w-[150px] h-12 justify-center items-center border border-gray-500 rounded-md my-2`}
            style={{ backgroundColor: color }} // Dynamic background color
            onPress={onPress}
        >
            <View className="flex-1 justify-center items-center">
                <Text className="text-base font-bold text-white text-center">{title}</Text>
            </View>
        </Pressable>
    );
};

export default AddButton;
