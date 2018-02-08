import { Routes, RouterModule } from '@angular/router';

import { ManageComponent } from './manage/index';


const appRoutes: Routes = [
    { path: '', component: ManageComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);