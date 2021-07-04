type Breadcrumbs = Breadcrumb[];

interface Breadcrumb {
    page: Page,
    subpages: Page[],
}

interface Page {
    name: string,
    icon_name: string
    url: string
}