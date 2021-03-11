import React from 'react';
import Data from '../views/Data';
import Home from '../views/Home';
import Settings from '../views/Settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

/*
 * This file is part of the HealthyHome project monitoring server
 * available at <https://www.github.com/healthyhomeuk/healthyhome>.
 *
 * Copyright (C) 2021 the authors of the HealthyHome project.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3 of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * @constant {NavBar}
 */
const NavBar = createBottomTabNavigator();
/**
 * 
 * @returns {NavBar.Navigator}
 */
function MainNavigationBar(){
    return(
    <NavBar.Navigator
    initialRouteName="Home" tabBarOptions={{activeTintColor: 'black', inactiveTintColor: 'gray', style:{backgroundColor:'#f2ffea'}}}>
     <NavBar.Screen name ="Settings" component={Settings}/>
     <NavBar.Screen name ="Home" component={Home}/>
     <NavBar.Screen name ="Data" component={Data}/>
   </NavBar.Navigator>
    )
}

export default MainNavigationBar;