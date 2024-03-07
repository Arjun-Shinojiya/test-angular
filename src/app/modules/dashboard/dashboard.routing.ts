import { NgModule } from '@angular/core'

import { RouterModule, Routes } from '@angular/router'

import { DashboardComponent } from './dashboard.component'
import {HomeDashboardComponent} from './components/dashborad-home/dashborad-home.component'
import {ManageFilesComponent} from './components/manage-files/manage-files.component'
import {ReportsComponent} from './components/reports/reports.component'
import {AccountsComponent} from './components/accounts/accounts.component'
import {MessagesComponent} from './components/messages/messages.component'
import {PaymentsComponent} from './components/payments/payments.component'
import {SettingsComponent} from './components/settings/settings.component'
import { ClientDetailsComponent } from './components/client-details/client-details.component'
import {BulkPurchaseComponent} from './components/bulk-purchase/bulk-purchase.component'
import {EditCompanyProfileComponent} from './components/edit-company-profile/edit-company-profile.component'
import {addNewCardComponent} from './components/add-new-card/add-new-card.component'
import { CreateNewFileComponent } from './components/create-new-file/create-new-file.component'

// DEFINING THE ROUTINGS
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children:
    [
      {path: '', component: HomeDashboardComponent},
      {path: 'manage-files', 
      component: ManageFilesComponent,
      },
      {path:'client-details/:propertyId/:tabSection', component: ClientDetailsComponent},
      {path: 'reports', component: ReportsComponent},
      {path: 'accounts', component: AccountsComponent},
      {path: 'messages', component: MessagesComponent},
      {path: 'payments', component: PaymentsComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'bulk-purchase', component: BulkPurchaseComponent},
      {path: 'edit-company-profile', component: EditCompanyProfileComponent},
      {path: 'add-new-card', component: addNewCardComponent},
      {path: 'create-new-file/:step', component: CreateNewFileComponent}
    ],
  }
 
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
