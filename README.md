
# RingCentral for PracticeSuite

RingCentral for PracticeSuite integration. Build with [RingCentral Embeddable](https://github.com/ringcentral/ringcentral-embeddable) and [Extension Factory](https://github.com/ringcentral/ringcentral-embeddable-extension-factory). Integrate with chrome extension or firefox add-on.

## Features

- Add RingCentral Widget into PracticeSuite web application
- Add Click-to-call button in Schedule detail page.
- Hover on patient phone number to show Click-to-call tooltip.
- Search patient on RingCentral Dial and SMS page
- Match Patient name on RingCentral incoming call page

## Screenshots

| screenshots            |  screenshots |
:-------------------------:|:-------------------------:
![PracticeSuite-1](https://user-images.githubusercontent.com/7036536/52160957-28849300-26f9-11e9-99e1-59292e71b892.png) | ![PracticeSuite-2](https://user-images.githubusercontent.com/7036536/52160970-55d14100-26f9-11e9-8b21-a582ca69243e.png)
![PracticeSuite-3](https://user-images.githubusercontent.com/7036536/51964049-499e7700-24a0-11e9-9439-471473df8e40.png) | ![PracticeSuite-4](https://user-images.githubusercontent.com/7036536/51964837-b581df00-24a2-11e9-91e0-94ee60a9d153.png)


## Releases

Please get releases in [here](https://github.com/embbnux/ringcentral-for-practicesuite/releases).

For Chrome: Download chrome extension zip file and decompress in local and goto `chrome://extensions/` to open developer mode and load unpackaged files.

For Firefox: Download firefox add-on xpi file, goto `about:addons` and install Add-on from file

## Development

1. Create an app from [https://developer.ringcentral.com/](https://developer.ringcentral.com/), make sure you choose a browser based app, and set all permissions, and add `https://ringcentral.github.io/ringcentral-embeddable/redirect.html` to your redirect URI list.

2. Edit `config.js`:

create config file, and set proper thirdPartyConfigs.serviceName and ringCentralConfigs.appKey

```
cp config.sample.js config.js
```

3. Build

Default to build chrome extension

```bash
# install dependencies, requires nodejs8.10+
yarn
# then run it
yarn start
# edit src/*.js, webpack will auto-rebuild,
# after rebuild, do not forget to refresh in extension page
```

For firefox add-on:

```
yarn
yarn build:firefox
```

4. Install

For Chrome:

- Go to Chrome extensions page `chrome://extensions/`.
- Open developer mode
- Load `dist` as unpacked package.
-  Log into 'practicesuite.com' site to check

For Firefox:

- Go to add-on debugging page page `about:debugging#addons`.
- Load `dist` as temporary add-on.
- Log into 'practicesuite.com' site to check

## License

MIT
