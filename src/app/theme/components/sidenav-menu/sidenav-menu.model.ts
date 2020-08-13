export class SidenavMenu {
    constructor(public id: number,
                public title: string,
                public routerLink: string,
                public queryParams: any,
                public href: string,
                public target: string,
                public hasSubMenu: boolean,
                public parentId: number) { }
} 