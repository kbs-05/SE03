import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideImgixLoader } from '@angular/common';
import { environment } from '../environments/environment';
import { ENREGISTREComponent } from './enregistre/enregistre.component';
import { AFFICHEComponent } from './affiche/affiche.component';
import { FormsModule } from '@angular/forms';
import { LISTEComponent } from './liste/liste.component';
import { QRCodeComponent } from 'angularx-qrcode';

@NgModule({
  declarations: [
    AppComponent,
    ENREGISTREComponent,
    AFFICHEComponent,
    LISTEComponent,
    
  ],
  imports: [
    QRCodeComponent,
    BrowserModule,
    AppRoutingModule,
     
    FormsModule
  ],
  providers: [
    provideRouter([]),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideImgixLoader('https://yourdomain.imgix.net'),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
