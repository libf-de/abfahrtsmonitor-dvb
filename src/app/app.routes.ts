import { Routes } from '@angular/router';
import { DepartureViewComponent } from './ui/routes/departure-view/departure-view.component';
import { StopSearchComponent } from './ui/routes/stop-search/stop-search.component';
import { SettingsComponent } from './ui/routes/settings/settings.component';

export const routes: Routes = [
    { path: '', component: StopSearchComponent },
    { path: 'settings', component: SettingsComponent },
    { path: ':id', component: DepartureViewComponent },
];
