import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MagnifyingGlassIcon, MapPinIcon } from "react-native-heroicons/outline";
import { useState, useCallback, useEffect } from "react";
import { theme } from "../theme/index";
import { debounce } from "lodash";
import { fetchLocations, fetchWeatherForecast } from "../api/clima";

const HomeScreen = () => {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [defaultCity, setDefaultCity] = useState('Buenos Aires');

  // Obtener el clima de Buenos Aires cuando el componente se monta
  useEffect(() => {
    fetchWeatherForecast({
      cityName: defaultCity,
      days: "7",
    }).then((data) => {
      setWeather(data);
      console.log("Clima predeterminado:", data);
    });
  }, []);

  const handleLocation = (loc) => {
    console.log("location:", loc);
    setLocations([]);
    toggleSearch(false);
    fetchWeatherForecast({
      cityName: loc.name,
      days: "7",
    }).then((data) => {
      setWeather(data);
      console.log("Ciudad seleccionada:", data);
    });
  };

  const handleSearch = (value) => {
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then((data) => {
        console.log(data);
        setLocations(data);
      });
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);
  const { current, location, forecast } = weather;

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        source={require("../assets/images/fondo.jpg")}
        className="h-full w-full absolute"
      />
      
      <SafeAreaView className="flex flex-1 mb-10 border-b-white">
        <View style={{ height: "9%" }} className="mx-4 my-8 relative z-50">
          <View
            className="flex-row justify-end items-center rounded-full"
            style={{
              backgroundColor: showSearch ? theme.bgWhite(0.2) : "transparent",
            }}
          >
            {showSearch ? (
              <TextInput
                onChangeText={handleTextDebounce}
                placeholder="Ciudad...."
                placeholderTextColor={"lightgray"}
                className="pl-6 h-10 flex-1 text-base text-white"
              />
            ) : null}

            <TouchableOpacity
              onPress={() => toggleSearch(!showSearch)}
              style={{ backgroundColor: theme.bgWhite(0.3) }}
              className="rounded-full p-3 m-1"
            >
              <MagnifyingGlassIcon size="25" color="white" />
            </TouchableOpacity>
          </View>
          {locations.length > 0 && showSearch ? (
            <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
              {locations.map((loc, index) => {
                let showBorder;
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleLocation(loc)}
                    className="flex-row items-center border-0 p-3 px-4 mb-1 border-b-2 border-b-gray-400"
                  >
                    <MapPinIcon size={20} color="red" />
                    <Text className="text-black text-lg ml-2">
                      {loc?.name},{loc?.country}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>
        
        <View className="mx-4 flex justify-around flex-1 mb-2">
          <Text className="text-2xl text-center font-bold text-white">
            {location?.name || "Buenos Aires"},
            <Text className="text-xl font-semibold text-gray-300">
              {location?.country || "Argentina"}
            </Text>
          </Text>
          
          <View className="flex-row justify-center">
            <Image
              source={{ uri: `https:${current?.condition.icon}` }}
              style={{ width: 250, height: 250 }}
            />
          </View>
          
          <View className="space-y-2">
            <Text className="text-center font-bold text-white text-6xl ml-5">
              {current?.temp_c}&#176;
            </Text>
            <Text className="text-center text-white text-xl tracking-widest">
              {current?.condition?.text}
            </Text>
          </View>
          
          <View className="flex-row justify-between mx-4">
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icons/viento.png")}
                className="h-6 w-6"
              />
              <Text className="text-white font-semibold text-base">
                {current?.wind_kph}km
              </Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icons/humedad.png")}
                className="h-6 w-6"
              />
              <Text className="text-white font-semibold text-base">
                {current?.humidity}%
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
