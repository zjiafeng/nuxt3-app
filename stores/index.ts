import { defineStore } from 'pinia'
import httpRequest from '@/utils/httpRequest'

interface stateType {
    globalConfig: any
    menu: any
    subMenu: any
    links: any[]
    errorInformation: any
    menuStatus: boolean
    isReadingMode: boolean
}
export const useGlobalStore = defineStore('userGlobal', () => {
    const config = useRuntimeConfig();

    // state
    const state = reactive<stateType>({
        globalConfig: {},
        menu: {},
        subMenu: {},
        links: [],
        errorInformation: {
            code: '',
            message: ''
        },
        menuStatus: false,
        isReadingMode: false
    })

    // actions
    // 初始化 获取公用信息
    const nuxtServerInit = async () => {
        const globalInfo: { banner: any } = await $fetch(`${config.public.baseUrl}/wp-json/xm-blog/v1/info`)
        const menu: { mainMenu: any, subMenu: any } = await $fetch(`${config.public.baseUrl}/wp-json/xm-blog/v1/menu`)
        const links: { data: any[] } = await $fetch(`${config.public.baseUrl}/wp-json/xm/v2/links?category=${encodeURI('首页')}`)
        // 判断banner类型
        if (globalInfo.banner.style === '1') {
            globalInfo.banner.big = globalInfo.banner.list[0]
            const [, banner1, banner2, banner3] = globalInfo.banner.list
            globalInfo.banner.small = [banner1, banner2, banner3]
        }
        state.globalConfig = globalInfo
        state.menu = menu.mainMenu
        state.subMenu = menu.subMenu
        state.links = links.data
    }

    // 
    return {
        state,
        nuxtServerInit,
    }
})