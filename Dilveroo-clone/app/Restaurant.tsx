import { View, Text, ScrollView, Image, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { urlFor } from '@/sanity';
import {ChevronRightIcon,MapPinIcon,QuestionMarkCircleIcon,StarIcon } from 'react-native-heroicons/solid';
import{ArrowLeftCircleIcon}from 'react-native-heroicons/outline'
import DishRow from '@/components/DishRow';
import BasketIcon from '@/components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '@/features/counter/restaurantSlice';


interface Dish {
  _id: string;
  name: string;
  short_description: string;
  price: number;
  image: string;
}

const Restaurant:React.FC = () => {

  const navigation = useNavigation()

  const dispatch = useDispatch()
  const route = useRoute();

  const { id,title,imgUrl,rating,genre,address,short_description,dishes,long,lat,} = route.params as {

    id: string;
    title: string;
    imgUrl: string;
    rating: number;
    genre: string;
    address: string;
    short_description: string;
    dishes: string[];
    long: number;
    lat: number;
};

useEffect(()=>{
  dispatch(
    setRestaurant({
      id,
      title,
      imgUrl,
      rating,
      genre,
      address,
      short_description,
      dishes,
      lat: 0,
      long: 0
    })
  )
},[dispatch])

useLayoutEffect(() => {
  navigation.setOptions({
      headerShown: false,
  })
}, [])





  return (
    <>
    <BasketIcon/>
    <ScrollView>
      <View className='relative'>
        <Image
            source={{
              uri:urlFor(imgUrl)
            }}
            className=' w-full h-56 bg-gray-300 p-4'
        />
        <Pressable onPress={navigation.goBack} className=' absolute top-14 left-5  bg-gray-100 rounded-full'>
          <ArrowLeftCircleIcon size={30} color='#00CCBB'/>
        </Pressable>
      </View>
      <View className=' bg-white'>
        <View className='px-4 pt-4'>
          <Text className=' text-3xl font-bold'>{title}</Text>
          <View className='flex-row space-x-2 my-1'>
            <View className=' flex-row items-center space-x-1'>
              <StarIcon color='green' opacity={0.5} size={20}/>
              <Text className=' text-xs  text-gray-500'>
              <Text className='text-green-500'>{rating}</Text> .{genre}
              </Text>
              <View className='flex-row items-center space-x-1'>
                <MapPinIcon size={20} color="gray" opacity={0.4}/>
                <Text className=' text-xs text-gray-500'>Nearby. {address}</Text>
              </View>
            </View>
          </View>
          <Text className=' text-sm text-gray-500 mt-3 pb-4 '>{short_description}</Text>
        </View>
        <TouchableOpacity className=' flex-row items-center space-x-2 p-4 border-y border-gray-300'>
          <QuestionMarkCircleIcon color='gray' opacity={0.5} size={20}/>
          <Text className=' flex-1  text-md font-bold'>
            Have a food allergy
          </Text>
          <ChevronRightIcon color='#00CCBB'/>
        </TouchableOpacity>
        <View className='pb-36'>
          <Text className='px-4 pt-6 mb-3  font-bold text-xl'>Menu</Text>
          {/* dashboard */}
          
          {dishes.length > 0 ? (
                    dishes.map(dishes => (
                        <DishRow
                            id={dishes._id}
                            title={dishes.name}
                            description={dishes.short_description}
                            price={dishes.price}
                            image={dishes.image}
                        />
                    ))
                ) : (
                    <Text>Loading...</Text>
                )}
        </View>
      </View>
    </ScrollView>
    </>
  )
}

export default Restaurant

function dispatch() {
  throw new Error('Function not implemented.');
}
