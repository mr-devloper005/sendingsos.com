import type { SiteRecipe } from '@/design/factory/recipe-types'

export const SITE_RECIPE: SiteRecipe = {
  productFamily: 'directory',
  themePack: 'yelp-local',
  homepageTemplate: 'classified-home',
  navbarTemplate: 'utility-bar',
  footerTemplate: 'dense-footer',
  motionPack: 'utility-snappy',
  primaryTask: 'classified',
  enabledTasks: ['classified'],
  taskTemplates: { classified: 'classified-market' },
  manualOverrides: {
    navbar: false,
    footer: false,
    homePage: false,
    taskListPage: false,
    taskDetailPage: false,
    taskCard: false,
    contactPage: false,
    loginPage: false,
    registerPage: false,
  },
}
