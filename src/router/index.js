import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'
import Map from '@/components/Map'
import Topics from '@/components/Topics/Topics'
import DiscountCatalogs from '@/components/Discounts/DiscountCatalogs'
import MyDiscountCatalogs from '@/components/Discounts/MyDiscountCatalogs'
import Events from '@/components/Events/Events'
import EventDetail from '@/components/Events/EventDetail'
import EditProfile from '@/components/Profile/EditProfile'
import FriendList from '@/components/Friends/FriendList'
import DiscountList from "@/components/Discounts/DiscountList";


Vue.use(VueRouter);

export const router = new VueRouter({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/registration',
            name: 'registration',
            component: Registration
        },
        {
            path: '/map',
            name: 'map',
            component: Map
        },
        {
            path: '/topics',
            name: 'topics',
            component: Topics,
            meta: {
                title: 'Topics'
            }
        },
        {
            path: '/discount-catalogs',
            name: 'discount-catalogs',
            component: DiscountCatalogs,
            meta: {
                title: 'Catalog'
            },
        },
        {
            path: '/discount-catalogs/:catalog_id/discounts',
            name: 'discounts-for-catalog',
            component: DiscountList,
            meta: {
                title: "Catalog's Discounts"
            }

        },
        {
            path: '/discounts/my',
            name: 'my-discount-catalogs',
            component: MyDiscountCatalogs,
            meta: {
                title: 'My Catalogs'
            }
        },

        {
            path: '/events',
            name: 'events',
            component: Events
        },
        {
            path: '/friends',
            name: 'friends',
            component: FriendList
        },
        {
            path: '/events/:eventId',
            name: 'event-detail',
            component: EventDetail,
            props: true,
        },
        {
            path: '/my_profile/edit',
            name: 'my-profile-edit',
            component: EditProfile,
        }

    ],
    mode: 'history'
});


router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/registration'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('userToken');

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
});