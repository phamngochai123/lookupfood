import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import Home from '../home/Home';
import HomeNews from '../home/HomeNews';
import PlaceSave from '../place/PlaceSave';
import Motel from '../lookup-motel/ListMotel';
import DetailMotel from '../lookup-motel/DetailMotel';
import Profiles from '../profiles/Profiles';
import MyProfiles from '../profiles/MyProfiles';
import ListRestaurant from '../home/ListNews/ListRestaurant';
import DetailRestaurant from '../detail-restaurant/DetailRestaurant';
import ListSearch from '../home/search/ListSearch';
import ListByKey from '../home/search/item-navigation/ListByKey';
import ListNearMe from '../home/search/item-navigation/ListNearMe';
import DirectRestaurant from '../detail-restaurant/infor-restaurant/DirectItem';
import CommentLocal from '../detail-restaurant/infor-restaurant/CommentLocalRestaurant';
import ImagesLocal from '../detail-restaurant/infor-restaurant/ImagesLocalRestaurant';
import ImageSwiper from '../detail-restaurant/infor-restaurant/ImageSwiper';
import InfoLocal from '../detail-restaurant/infor-restaurant/InfoLocalRestaurant';
import MenuRestaurant from '../detail-restaurant/infor-restaurant/MenuRestaurant';

// export const HomeStack = StackNavigator({
//   Screen_HomeNews: {
//     screen: ListRestaurant,
//     navigationOptions: {
//       header: null,
//       title: 'Khám phá',
//       tabBarLabel: 'Home',
//       tabBarIcon: ({ tintColor }) => (
//         <Image
//           source={require('../../../public/images/icon-home.png')}
//           style={[styles.icon, { tintColor: tintColor }]}
//         />
//       ),
//     },
//   },
//   Screen_DetailRestaurant: {
//     screen: DetailRestaurant,
//     navigationOptions: {
//       tabBarLabel: 'Home',
//       tabBarVisible: false,
//       tabBarIcon: ({ tintColor }) => (
//         <Image
//           source={require('../../../public/images/icon-home.png')}
//           style={[styles.icon, { tintColor: tintColor }]}
//         />
//       ),
//     },
//   },
//   Screen_DirectRestaurant: {
//     screen: DirectRestaurant,
//     navigationOptions: {
//       tabBarLabel: 'Home',
//       tabBarVisible: false
//     },
//   },
//   Screen_ListSearchs: {
//     screen: ListSearch,
//     navigationOptions: {
//       title: 'Gần tôi',
//       tabBarLabel: 'Gần tôi',
//       tabBarVisible: false
//     }
//   },
//   Screen_ImageSwiper: {
//     screen: ImageSwiper,
//     navigationOptions: {
//       tabBarLabel: 'Home',
//       tabBarVisible: false
//     },
//   },
// });

// export const PlaceSaveStack = StackNavigator({
//   Screen_PlaceSave: {
//     screen: PlaceSave,
//     navigationOptions: {
//       title: 'Địa điểm đã lưu',
//       tabBarLabel: 'PlaceSave',
//       tabBarIcon: ({ tintColor }) => (
//         <Image
//           source={require('../../../public/images/icon-save2.png')}
//           style={[styles.icon, { tintColor: tintColor }]}
//         />
//       ),
//     }
//   },
//   Screen_DetailRestaurant: {
//     screen: DetailRestaurant,
//     navigationOptions: {
//       tabBarLabel: 'Home',
//       tabBarVisible: false,
//       tabBarIcon: ({ tintColor }) => (
//         <Image
//           source={require('../../../public/images/icon-home.png')}
//           style={[styles.icon, { tintColor: tintColor }]}
//         />
//       ),
//     },
//   },
//   Screen_DirectRestaurant: {
//     screen: DirectRestaurant,
//     navigationOptions: {
//       tabBarLabel: 'Home',
//       tabBarVisible: false
//     },
//   },
// });

// export const ProfilesStack = StackNavigator({
//   Screen_Profiles: {
//     screen: Profiles,
//     navigationOptions: {
//       title: 'Thông tin',
//       tabBarLabel: 'Profiles',
//       tabBarIcon: ({ tintColor }) => (
//         <Image
//           source={require('../../../public/images/icon-profiles2.png')}
//           style={[styles.icon, { tintColor: tintColor }]}
//         />
//       ),
//     }
//   },
// });

// export const SearchByKey = StackNavigator({
//   Screen_ListByKey: {
//     screen: ListByKey,
//     path: 'search/:value',
//     navigationOptions: {
//       header: null,
//       title: 'Đúng nhất',
//       tabBarLabel: 'Đúng nhất',
//     }
//   },
// });

// export const ScrCommentLocal = StackNavigator({
//   Screen_CommentLocal: {
//     screen: CommentLocal,
//     navigationOptions: {
//       header: null
//     }
//   },
// });
// export const ScrInfoLocal = StackNavigator({
//   Screen_InforLocal: {
//     screen: InfoLocal,
//     navigationOptions: {
//       header: null
//     }
//   },
// });

// export const ScrImageLocal = StackNavigator({
//   Screen_InforLocal: {
//     screen: ImagesLocal,
//     navigationOptions: {
//       header: null
//     }
//   },
// });

// export const ScrImageSwiper = StackNavigator({
//   Screen_ImageSwiper: {
//     screen: ImageSwiper,
//     navigationOptions: {
//       header: null
//     }
//   },
// });

// export const TabbarInfo = TabNavigator({
//   Info: {
//     screen: ScrInfoLocal
//   },
//   Comment: {
//     screen: ScrCommentLocal,
//   },
//   Image: {
//     screen: ScrImageLocal
//   },
//   Menu: {
//     screen: MenuRestaurant
//   }
// },
//   {
//     lazy: true,
//     tabBarOptions: {
//       showIcon: true,
//       showLabel: true,
//       labelStyle: {
//         fontSize: 10,
//         color: 'red',
//         textAlign: 'center',
//         lineHeight: 10,
//         marginTop: -10
//       },
//       tabStyle: {
//         height: 30,
//       },
//       style: {
//         backgroundColor: '#dddddd',
//       },
//     },
//     tabBarIcon: {
//       focused: true,
//       tintColor: 'red',
//     },
//   });

// export const ScrInfoLocals = StackNavigator({
//   Screen_Info: {
//     screen: TabbarInfo,
//     navigationOptions: {
//       header: null
//     }
//   },
//   Screen_ImageSwiper: {
//     screen: ImageSwiper,
//     navigationOptions: {
//       header: null
//     }
//   },
// });

// export const SearchNearMe = StackNavigator({
//   Screen_ListNearMe: {
//     screen: ListNearMe,
//     path: 'search/:valueNear',
//     navigationOptions: {
//       header: null,
//       title: 'Gần tôi',
//       tabBarLabel: 'Gần tôi',
//     }
//   },
// });

// export const TabbarSearch = TabNavigator({
//   ListByKeys: {
//     screen: SearchByKey,
//   },
//   ListNearMes: {
//     screen: SearchNearMe
//   },
// },
//   {
//     lazy: true,
//     tabBarOptions: {
//       showIcon: true,
//       showLabel: true,
//       labelStyle: {
//         fontSize: 10,
//         color: 'red',
//         textAlign: 'center',
//         lineHeight: 10,
//         marginTop: -10
//       },
//       tabStyle: {
//         height: 30,
//       },
//       style: {
//         backgroundColor: '#dddddd',
//       },
//     },
//     tabBarIcon: {
//       focused: true,
//       tintColor: 'red',
//     },
//   });

// export const SearchLocal = StackNavigator({
//   Screen_ListSearch: {
//     screen: TabbarSearch,
//     navigationOptions: {
//       title: 'Gần tôi',
//       tabBarLabel: 'Gần tôi',
//     }
//   },
// });

// export const Tabbar = TabNavigator({
//   Home: {
//     screen: HomeStack,
//   },
//   PlaceSave: {
//     screen: PlaceSaveStack
//   },
//   Profiles: {
//     screen: ProfilesStack,
//   },
// },
//   {
//     swipeEnabled: false,
//     lazy: true,
//     tabBarPosition: 'bottom',
//     tabBarOptions: {
//       showIcon: true,
//       showLabel: false,
//     },
//     tabBarIcon: {
//       focused: true,
//       tintColor: 'red',
//     },
//   });


const Tabs = TabNavigator(
  {
    HomeScreen: {
      screen: ListRestaurant,
      navigationOptions: {
        header: null,
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../../../public/images/icon-home.png')}
            style={[styles.icon, { tintColor: tintColor }]}
          />
        ),
      }
    },
    SaveScreen: {
      screen: PlaceSave,
      navigationOptions: {
        title: 'Địa điểm đã lưu',
        tabBarLabel: 'PlaceSave',
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../../../public/images/icon-save2.png')}
            style={[styles.icon, { tintColor: tintColor }]}
          />
        ),
      }
    },
    MotelScreen: {
      screen: Motel,
      navigationOptions: {
        title: 'Danh sách nhà trọ',
        tabBarLabel: 'Motel',
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../../../public/images/motel.png')}
            style={[styles.icon, { tintColor: tintColor }]}
          />
        ),
      }
    },
    ProfilesScreen: {
      screen: Profiles,
      navigationOptions: {
        title: 'Thông tin cá nhân',
        tabBarLabel: 'Profiles',
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../../../public/images/icon-profiles2.png')}
            style={[styles.icon, { tintColor: tintColor }]}
          />
        ),
      }
    }
  },
  {
    swipeEnabled: false,
    lazy: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: 'red',
    },
    tabBarIcon: {
      focused: true,
      tintColor: 'red',
    },
  }
);
export const SearchTabs = TabNavigator(
  {
    SearchByKeyScreen: {
      screen: ListByKey,
      navigationOptions: {
        header: null,
        title: 'Đúng nhất',
        tabBarLabel: 'Đúng nhất',
      }
    },
    SearchNearMeScreen: {
      screen: ListNearMe,
      navigationOptions: {
        header: null,
        title: 'Gần tôi',
        tabBarLabel: 'Gần tôi',
      }
    }
  },
  {
    lazy: true,
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      labelStyle: {
        fontSize: 10,
        color: 'red',
        textAlign: 'center',
        lineHeight: 10,
        marginTop: -10
      },
      tabStyle: {
        height: 30,
      },
      style: {
        backgroundColor: '#dddddd',
      },
    },
    tabBarIcon: {
      focused: true,
      tintColor: 'red',
    },
  }
);
export const InfoTabs = TabNavigator(
  {
    InfoScreen: {
      screen: InfoLocal,
      navigationOptions: {
        title: 'Thông tin',
        header: null
      }
    },
    CommentScreen: {
      screen: CommentLocal,
      navigationOptions: {
        title: 'Bình luận',
        header: null
      }
    },
    ImageScreen: {
      screen: ImagesLocal,
      navigationOptions: {
        title: 'Ảnh',
        header: null
      }
    },
    MenuScreen: {
      screen: MenuRestaurant,
      navigationOptions: {
        title: 'Thực đơn',
        header: null
      }
    }
  },
  {
    lazy: true,
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      labelStyle: {
        fontSize: 10,
        color: 'red',
        textAlign: 'center',
        lineHeight: 10,
        marginTop: -10
      },
      tabStyle: {
        height: 30,
      },
      style: {
        backgroundColor: '#dddddd',
      },
    },
    tabBarIcon: {
      focused: true,
      tintColor: 'red',
    },
  }
);
export const Root = StackNavigator(
  {
    Tabs: {
      screen: Tabs,
    },
    SearchTabs: {
      screen: ListSearch
    },
    InfoTabs: {
      screen: DetailRestaurant
    },
    ImageSwiperScreen: {
      screen: ImageSwiper,
      navigationOptions: {
        title: 'Ảnh'
      }
    },
    DirectRestaurantScreen: {
      screen: DirectRestaurant,
      navigationOptions: {
        title: 'Chỉ đường'
      }
    },
    LoginScreen: {
      screen: Profiles,
      navigationOptions: {
        title: 'Đăng nhập'
      }
    },
    MyProfile: {
      screen: MyProfiles,
      navigationOptions: {
        title: 'Thông tin cá nhân'
      }
    },
    DetailMotel: {
      screen: DetailMotel,
      navigationOptions: {
        title: 'Chi tiết'
      }
    },
  },
);

const styles = StyleSheet.create({
  icon: {
    width: 23,
    height: 23,
  },
});