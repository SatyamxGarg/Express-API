import { PrismaClient } from "@prisma/client";

export const addCountry = async(prisma: PrismaClient) => {

    const countries = [
    { country_name: 'India', country_id: 1 },
    { country_name: 'USA', country_id: 2 }
   
];
const checkCountry = await prisma.emCountry.count();
  if(checkCountry === 0){
    const res =  await prisma.emCountry.createMany({
     data: countries.map((country: any) => ({
    countryName: country.country_name,
    countryId: country.country_id
     }))
    });
  }

// for(let cntry of countries){
//     const checkCountry = await prisma.emCountry.findFirst({
//         where: {
//           countryName: cntry.country_name
//         },
//       });
//       if(!checkCountry){
//           await prisma.emCountry.create({
//               data: {
//                   countryName: cntry.country_name,
//                 },
//           })
//       }
//       }

}

export const addState = async(prisma: PrismaClient) => {

    const states = [
    { state_name: 'Haryana', country_id: 1 },
    { state_name: 'Punjab', country_id: 1 },
    { state_name: 'California', country_id: 2 },
    { state_name: 'New York', country_id: 2 },
];
const checkState = await prisma.emState.count();
  if(checkState === 0){
    const res =  await prisma.emState.createMany({
     data: states.map((state: any) => ({
     stateName: state.state_name,
     countryId: state.country_id     
     }))
    });
  }

// for(let state of states){
//     const checkState = await prisma.emState.findFirst({
//         where: {
//           stateName: state.state_name
//         },
//       });
//       if(!checkState){
//         await prisma.emState.create({
//             data: {
//                 stateName: state.state_name,
//                 countryId: state.country_id
//               },
//         })
//       }
  
// }

}

export const addCity = async(prisma: PrismaClient) => {

    const cities = [
    { city_name: 'Yamuna Nagar', state_id: 1 },
    { city_name: 'Ambala', state_id: 1 },
    { city_name: 'Mohali', state_id: 2 },
    { city_name: 'Amritsar', state_id: 2 },
    { city_name: 'Los Angeles', state_id: 3 },
    { city_name: 'San Diego', state_id: 3 },
    { city_name: 'Yonkers', state_id: 4 },
    { city_name: 'Rochesters', state_id: 4 }

];
  const checkCity = await prisma.emCities.count();
  if(checkCity === 0){
    const res =  await prisma.emCities.createMany({
     data: cities.map((city: any) => ({
      cityName: city.city_name,
      stateId: city.state_id,
     }))
    });
  }

    // const checkCity = await prisma.emCities.findFirst({
    //     where: {
    //       cityName: city.city_name
    //     },
    //   });
    //   console.log(checkCity,'check vity')
    //   if(!checkCity){
    //     await prisma.emCities.create({
    //         data: {
    //             cityName: city.city_name,
    //             stateId: city.state_id
    //           },
    //     })
    //   }
}
