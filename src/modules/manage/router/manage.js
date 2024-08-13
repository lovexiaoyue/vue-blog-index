const Login = resolve => require(["@/modules/manage/login"], resolve);
const Home = resolve => require(["@/modules/manage/home.vue"], resolve);
const Setting = resolve => require(["@/modules/manage/page/setting"], resolve);
const Article = resolve => require(["@/modules/manage/page/article"], resolve);
const ArticleList = resolve => require(["@/modules/manage/page/articleList"], resolve);
const AddArticle = resolve => require(["@/modules/manage/page/addArticle"], resolve);
const Users = resolve => require(["@/modules/manage/page/users"], resolve);
const AddArticleBk = resolve => require(["@/modules/manage/page/addArticlebk"], resolve);
const Message = resolve => require(["@/modules/manage/page/message"], resolve);
const Comment = resolve => require(["@/modules/manage/page/comment"], resolve);
const Rassword = resolve => require(["@/modules/manage/page/password"], resolve);
const Link = resolve => require(["@/modules/manage/page/link"], resolve);
const Ad = resolve => require(["@/modules/manage/page/ad"], resolve);


const manage = [
  {
    path: "/",
    component: Login,
    redirect: { name: "manageLogin" }
  },
  {
    path: "/login",
    component: Login,
    name: "manageLogin"
  },
  {
    path: "/home",
    component: Home,
    name: "manageHome",
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    },
    children: [
      {
        path: "/setting",
        component: Setting,
        name: "发布活动",
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/articlelist",
        component: Article,
        name: "兼职列表",
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/activelist",
        component: ArticleList,
        name: "活动列表",
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/article/add",
        component: AddArticle,
        name: "发布兼职",
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/article/edit/:id",
        component: AddArticle,
        name: "编辑兼职",
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/setting/edit/:id",
        component: Setting,
        name: "编辑活动",
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/users",
        component: Users,
        name: "会员列表",
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/addArticlebk",
        component: AddArticleBk,
        name: "会员列表",
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/resetpassword",
        component: Rassword,
        name: "修改密码",
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/link",
        component: Link,
        name: "友情链接",
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/ad",
        component: Ad,
        name: "广告图",
        meta: {
          requireAuth: true
        }
      },
      { path: "/*", redirect: { name: "兼职列表" } }
    ]
  }
];
export default manage