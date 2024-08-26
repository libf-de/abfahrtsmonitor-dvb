# Abfahrtsmonitor
This is a recreation of [DVB Abfahrtsmonitor](https://www.dvb.de/de-de/service/geschaeftskunden/abfahrtsmonitor/) in Material3 design. Find my running instance [here](https://libf.de/am/).

## Story
I'm always late, so I wanted an always-on monitor showing me departure times of the bus stop next to my home. I had an old Nexus 7 tablet laying around which I wanted to use for this purpose. As I couldn't find an app that always shows current departure times for a given station (with all platforms visible at once), I decided to recreate DVBs own webapp which they sadly only provide to commercial customers. So if you want to repurpose an old tablet into such a monitor, this is for you.

## Technology
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.1.
It uses the awesome [BeerCSS](https://www.beercss.com/) for the frontend, and fetches data from VVO API (thanks to [kiliankoe/vvo](https://github.com/kiliankoe/vvo)).

### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. You might need to adjust the `<base href="">` in `src/index.html`.