import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  icon?: string;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}
const NavigationItems = [
  /************ Admin *************/

  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    role: "ADMIN",
    children: [
      {
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/default',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'main',
    title: 'Main',
    type: 'group',
    icon: 'icon-navigation',
    role: "ADMIN",
    children: [
      {
        id: 'main',
        title: 'Subjects',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/subject',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      },
      {
        id: 'main',
        title: 'Claims',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/claims',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
      ,
      {
        id: 'main',
        title: 'Teachers',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/teachers',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
      ,
      {
        id: 'main',
        title: 'Students',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/students',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      },
      {
        id: 'main',
        title: 'Demand',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/demand',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
    ]
  },
  /************ Student *************/
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    role: "STUDENT",
    children: [
      {
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/student/default',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'main',
    title: 'Main',
    type: 'group',
    icon: 'icon-navigation',
    role: "STUDENT",
    children: [
      {
        id: 'main',
        title: 'Subjects',
        type: 'item',
        classes: 'nav-item',
        url: '/student/subject',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      },
      {
        id: 'main',
        title: 'Claims',
        type: 'item',
        classes: 'nav-item',
        url: '/student/claims',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      },
      {
        id: 'main',
        title: 'Demand',
        type: 'item',
        classes: 'nav-item',
        url: '/student/demand',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
    ]
  },
 /*  {
    id: 'page',
    title: 'Pages',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Authentication',
        title: 'Authentication',
        type: 'collapse',
        icon: 'ti ti-key',
        children: [
          {
            id: 'login',
            title: 'Login',
            type: 'item',
            url: '/guest/login',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'register',
            title: 'Register',
            type: 'item',
            url: '/guest/register',
            target: true,
            breadcrumbs: false
          }
        ]
      }
    ]
  }, */
 /* {
    id: 'elements',
    title: 'Elements',
    type: 'group',
    icon: 'icon-navigation',
    role: "STUDENT",
    children: [
      {
        id: 'typography',
        title: 'Typography',
        type: 'item',
        classes: 'nav-item',
        url: '/student/typography',
        icon: 'ti ti-typography'
      },
      {
        id: 'color',
        title: 'Colors',
        type: 'item',
        classes: 'nav-item',
        url: '/student/color',
        icon: 'ti ti-brush'
      } ,
      {
        id: 'tabler',
        title: 'Tabler',
        type: 'item',
        classes: 'nav-item',
        url: 'https://tabler-icons.io/',
        icon: 'ti ti-plant-2',
        target: true,
        external: true
      } 
    ]
  },
  {
    id: 'other',
    title: 'Other',
    type: 'group',
    icon: 'icon-navigation',
    role: "STUDENT",
    children: [
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/student/sample-page',
        classes: 'nav-item',
        icon: 'ti ti-brand-chrome'
      }/* ,
      {
        id: 'document',
        title: 'Document',
        type: 'item',
        classes: 'nav-item',
        url: 'https://codedthemes.gitbook.io/berry-angular/',
        icon: 'ti ti-vocabulary',
        target: true,
        external: true
      } 
    ]
  },*/
  /************ Teacher *************/

  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    role: "TEACHER",
    children: [
      {
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/teacher/default',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'main',
    title: 'Main',
    type: 'group',
    icon: 'icon-navigation',
    role: "TEACHER",
    children: [
      {
        id: 'main',
        title: 'Subjects',
        type: 'item',
        classes: 'nav-item',
        url: '/teacher/subject',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      },
      {
        id: 'main',
        title: 'Claims',
        type: 'item',
        classes: 'nav-item',
        url: '/teacher/claims',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      },/*
      {
        id: 'main',
        title: 'Demand',
        type: 'item',
        classes: 'nav-item',
        url: '/student/demand',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      } */
    ]
  },
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
