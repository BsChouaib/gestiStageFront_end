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
  imports: [BrowserModule, AppRoutingModule, SharedModule, BrowserAnimationsModule],
  providers: [NavigationItem],
  bootstrap: [AppComponent]
})
export class AppModule {}
