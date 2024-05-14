import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationItem } from './mainLayout/navigation/navigation';
import { NavBarComponent } from './mainLayout/nav-bar/nav-bar.component';
import { NavLeftComponent } from './mainLayout/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './mainLayout/nav-bar/nav-right/nav-right.component';
import { NavigationComponent } from './mainLayout/navigation/navigation.component';
import { NavLogoComponent } from './mainLayout/nav-bar/nav-logo/nav-logo.component';
import { NavContentComponent } from './mainLayout/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './mainLayout/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './mainLayout/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './mainLayout/navigation/nav-content/nav-item/nav-item.component';
import { SharedModule } from './theme/shared/shared.module';
import { ConfigurationComponent } from './mainLayout/configuration/configuration.component';
import { AuthenticationComponent } from './authentication/guest/authentication.component';
import { MainComponent } from './mainLayout/main.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtInterceptor } from './Services/jwt.interceptor';
import { AuthGuard } from './authentication/auth.guard';
import { ToastrModule } from 'ngx-toastr';
import { customInterceptor } from './Services/custom.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavBarComponent,
    NavLeftComponent,
    NavRightComponent,
    NavigationComponent,
    NavLogoComponent,
    NavContentComponent,
    NavGroupComponent,
    NavItemComponent,
    NavCollapseComponent,
    ConfigurationComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    NavigationItem , /* provideHttpClient(withInterceptors([customInterceptor])) */  /* {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  } */
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
