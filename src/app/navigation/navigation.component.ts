import { Component, Input, AfterContentInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
    templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterContentInit {
    navData: object;
    rootPath: string;
    @Input() content: object;
    constructor(private router: Router) {}

    async fetchContent(): Promise<Array<Object>> {
        const rootPath = this.getRootPath();
        const url = `${environment.restUrlBase}${rootPath}`;
        const childUrl = `${environment.restUrlBase}${rootPath}/@nodes`;
        const parentRes = fetch(url);
        const childRes = fetch(childUrl);
        await parentRes;
        await childRes;
        const parentData = await (await parentRes).json();
        const childData = await (await childRes).json();
        const contents = [parentData, ...childData];
        return contents;
    }

    getRootPath(): string {
        const paths = this.content['@path'].split('/');
        return paths.length > 2 ? `/${paths[1]}` : '/';
    }

    ngAfterContentInit(): void {
        if (this.content && !this.navData) {
            this.fetchContent().then(data => {
                this.navData = data;
                this.rootPath = data.length ? `/${data[0]['@name']}` : '';
            });
        }
    }

    getLink(item: object): string {
        const path = this.getRelativePath(item['@path']);
        return `${path.endsWith('/') ? path : `${path.substr(0, path.length)}.html`}`;
    }

    isActive(item: object): boolean {
        const path = this.getRelativePath(item['@path']);
        let { url } = this.router;
        url = url.replace(/\.html.*$/, '');
        url = url === '' ? '/' : url;
        return url === path;
    }

    getRelativePath(path: string): string {
        const relativePath = path.substring(this.rootPath.length);
        return relativePath === '' ? '/' : relativePath;
    }
}
