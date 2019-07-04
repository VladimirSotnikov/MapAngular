import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.template.html',
    styleUrls: ['./app.style.scss']
})
export class AppComponent {

    title = 'client-app';
    values: string[] = [];

    constructor(http: HttpClient) {
        http.get('/api/values')
            .pipe(map(data => data as string[]))
            .subscribe(values => {
                this.values = values;
            });
    }
}
