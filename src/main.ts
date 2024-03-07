/*
         FILENAME: totalscope_web_client/src/main.ts
           AUTHOR: TBD
          SUMMARY: TBD
          PURPOSE: TBD
  IMPORTING FILES: TBD
SUBSCRIBING FILES: TBD
 LAST COMMIT DATE: September 15, 2023
*/

// TBD
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';

// TBD
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
