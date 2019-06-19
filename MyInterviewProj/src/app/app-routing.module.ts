import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";
import { LoginComponent } from "./Modules/security/login/login.component";
import { LayoutComponent } from "./Modules/layout/layout/layout.component";

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent

    },
    {
        path :'sto',
        component : LayoutComponent,
        children : [

            {
              path: 'customer',
              loadChildren: './Modules/customer/customer.module#CustomerModule',
              //canActivate: [AuthGuard]
            },
            {
              path: 'dashboard',
              loadChildren: './Modules/dashboard/dashboard.module#DashboardModule'
            },
            {
              path: 'order',
              loadChildren: './Modules/order/order.module#OrderModule'
            }
        ]

    }
    
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }