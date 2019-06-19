import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SecurityModule } from './Modules/security/security.module';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './Modules/layout/layout.module';
import { SharedModule } from './Modules/shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token-interceptor';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,  
    HttpClientModule,
    RouterModule, 
    AppRoutingModule,   
    LayoutModule,   
    SecurityModule,
    ToastrModule.forRoot(),
    SharedModule  
    // AgmCoreModule.forRoot({
    //   apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    // })
  ],
  declarations: [
    AppComponent      
  ],
  
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
