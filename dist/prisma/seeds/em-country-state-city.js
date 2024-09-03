"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCity = exports.addState = exports.addCountry = void 0;
const addCountry = (prisma) => __awaiter(void 0, void 0, void 0, function* () {
    const countries = [
        { country_name: 'India', country_id: 1 },
        { country_name: 'USA', country_id: 2 }
    ];
    const checkCountry = yield prisma.emCountry.count();
    if (checkCountry === 0) {
        const res = yield prisma.emCountry.createMany({
            data: countries.map((country) => ({
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
});
exports.addCountry = addCountry;
const addState = (prisma) => __awaiter(void 0, void 0, void 0, function* () {
    const states = [
        { state_name: 'Haryana', country_id: 1 },
        { state_name: 'Punjab', country_id: 1 },
        { state_name: 'California', country_id: 2 },
        { state_name: 'New York', country_id: 2 },
    ];
    const checkState = yield prisma.emState.count();
    if (checkState === 0) {
        const res = yield prisma.emState.createMany({
            data: states.map((state) => ({
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
});
exports.addState = addState;
const addCity = (prisma) => __awaiter(void 0, void 0, void 0, function* () {
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
    const checkCity = yield prisma.emCities.count();
    if (checkCity === 0) {
        const res = yield prisma.emCities.createMany({
            data: cities.map((city) => ({
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
});
exports.addCity = addCity;
