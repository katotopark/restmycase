import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _adb170fa = () => import('../src/pages/participantPool.vue' /* webpackChunkName: "pages/participantPool" */).then(m => m.default || m)
const _841b549a = () => import('../src/pages/dissection.vue' /* webpackChunkName: "pages/dissection" */).then(m => m.default || m)
const _fcabfda2 = () => import('../src/pages/caseRandom.vue' /* webpackChunkName: "pages/caseRandom" */).then(m => m.default || m)
const _6e71a639 = () => import('../src/pages/alp.vue' /* webpackChunkName: "pages/alp" */).then(m => m.default || m)
const _644a25be = () => import('../src/pages/about.vue' /* webpackChunkName: "pages/about" */).then(m => m.default || m)
const _76f9e154 = () => import('../src/pages/aqp.vue' /* webpackChunkName: "pages/aqp" */).then(m => m.default || m)
const _46bfe9d7 = () => import('../src/pages/cases.vue' /* webpackChunkName: "pages/cases" */).then(m => m.default || m)
const _0895731a = () => import('../src/pages/cases/index.vue' /* webpackChunkName: "pages/cases/index" */).then(m => m.default || m)
const _2aa49846 = () => import('../src/pages/cases/mintConfirm.vue' /* webpackChunkName: "pages/cases/mintConfirm" */).then(m => m.default || m)
const _8e50838e = () => import('../src/pages/cases/loba3.vue' /* webpackChunkName: "pages/cases/loba3" */).then(m => m.default || m)
const _8e88e192 = () => import('../src/pages/cases/loba1.vue' /* webpackChunkName: "pages/cases/loba1" */).then(m => m.default || m)
const _2a75f080 = () => import('../src/pages/cases/caseNaming.vue' /* webpackChunkName: "pages/cases/caseNaming" */).then(m => m.default || m)
const _8e6cb290 = () => import('../src/pages/cases/loba2.vue' /* webpackChunkName: "pages/cases/loba2" */).then(m => m.default || m)
const _8744c30e = () => import('../src/pages/cases/lobas.vue' /* webpackChunkName: "pages/cases/lobas" */).then(m => m.default || m)
const _41397402 = () => import('../src/pages/cases/_id.vue' /* webpackChunkName: "pages/cases/_id" */).then(m => m.default || m)
const _fa291df6 = () => import('../src/pages/cases/_id/index.vue' /* webpackChunkName: "pages/cases/_id/index" */).then(m => m.default || m)
const _24da7034 = () => import('../src/pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/participantPool",
			component: _adb170fa,
			name: "participantPool"
		},
		{
			path: "/dissection",
			component: _841b549a,
			name: "dissection"
		},
		{
			path: "/caseRandom",
			component: _fcabfda2,
			name: "caseRandom"
		},
		{
			path: "/alp",
			component: _6e71a639,
			name: "alp"
		},
		{
			path: "/about",
			component: _644a25be,
			name: "about"
		},
		{
			path: "/aqp",
			component: _76f9e154,
			name: "aqp"
		},
		{
			path: "/cases",
			component: _46bfe9d7,
			children: [
				{
					path: "",
					component: _0895731a,
					name: "cases"
				},
				{
					path: "mintConfirm",
					component: _2aa49846,
					name: "cases-mintConfirm"
				},
				{
					path: "loba3",
					component: _8e50838e,
					name: "cases-loba3"
				},
				{
					path: "loba1",
					component: _8e88e192,
					name: "cases-loba1"
				},
				{
					path: "caseNaming",
					component: _2a75f080,
					name: "cases-caseNaming"
				},
				{
					path: "loba2",
					component: _8e6cb290,
					name: "cases-loba2"
				},
				{
					path: "lobas",
					component: _8744c30e,
					name: "cases-lobas"
				},
				{
					path: ":id",
					component: _41397402,
					children: [
						{
							path: "",
							component: _fa291df6,
							name: "cases-id"
						}
					]
				}
			]
		},
		{
			path: "/",
			component: _24da7034,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
