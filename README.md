
# RingCentral for PracticeSuite (Community)

RingCentral for PracticeSuite Chrome extension. Build with [RingCentral Embeddable](https://github.com/ringcentral/ringcentral-embeddable) and [Extension Factory](https://github.com/ringcentral/ringcentral-embeddable-extension-factory), you could create similar extension for other CRM sites with it.

## Features

- [x] Add RingCentral Widget into PracticeSuite web application
- [x] Add Click-to-call button in Schedule detail page.
- [x] Hover on patient phone number to show Click-to-call tooltip.
- [x] Search patient on RingCentral Dial and SMS page
- [x] Match Patient name on RingCentral incoming call page
- [x] Custom X-USER-AGENT header for api request
- [x] Support RingCentral Video

## Video

[https://youtu.be/vZXrEDy9Be4](https://youtu.be/vZXrEDy9Be4)

## Screenshots

| screenshots            |  screenshots |
:-------------------------:|:-------------------------:
![PracticeSuite-1](https://user-images.githubusercontent.com/7036536/52160957-28849300-26f9-11e9-99e1-59292e71b892.png) | ![PracticeSuite-2](https://user-images.githubusercontent.com/7036536/52160970-55d14100-26f9-11e9-8b21-a582ca69243e.png)
![PracticeSuite-3](https://user-images.githubusercontent.com/7036536/51964049-499e7700-24a0-11e9-9439-471473df8e40.png) | ![PracticeSuite-4](https://user-images.githubusercontent.com/7036536/51964837-b581df00-24a2-11e9-91e0-94ee60a9d153.png)

## Releases

Please get releases in [here](https://github.com/ringcentral/ringcentral-for-practicesuite/releases).

For Chrome: Download chrome extension zip file and decompress in local and goto `chrome://extensions/` to open developer mode and load unpackaged files.

## Development

1. Create an app from [https://developer.ringcentral.com/](https://developer.ringcentral.com/), make sure you choose a browser based app, and set all permissions, and add `https://ringcentral.github.io/ringcentral-embeddable/redirect.html` to your redirect URI list.

2. Edit `config.js`:

create config file, and set proper thirdPartyConfigs.serviceName and ringCentralConfigs.appKey

```bash
cp config.sample.js config.js
```

3. Build

Default to build chrome extension

```bash
# install dependencies, requires nodejs8.10+
npm i
# then run it
npm start
# edit src/*.js, webpack will auto-rebuild,
# after rebuild, do not forget to refresh in extension page
```

## License

MIT
