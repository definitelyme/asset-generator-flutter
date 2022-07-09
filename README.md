# Flutter Assets Generator

Please support me if this package is useful for you. My laptop is broken soon so your kindness is really help me a lot, Thanks.

<a href="https://www.buymeacoffee.com/flutter.gen" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee, Please." style="height: 60px !important;width: 217px !important;" ></a>

> <https://www.buymeacoffee.com/flutter.gen>

PS. if you need add any features or find problem please let me know.
<br />

All credits for this extension go to <https://github.com/sumate-sdk>
<br>
Main repo can be found here <https://github.com/sumate-sdk/assets-generator-flutter>

<br />
<br />

### Github
<https://github.com/definitelyme/asset-generator-flutter.git>

<br />
<br />

## Update your pubspec.yaml file

``` yaml

flutter:
  assets:
    - assets/sound/
    - assets/images/icon/
    - assets/images/background/
    ...

```

<br />
<br />

## Command

In VSCode press `Command + Shift + P` then select option

`Flutter Assets Generator: Assets` >>> Generate code from pubspec.yaml assets.

`Flutter Assets Generator: Config file` >>> Generate generate config file `.flutgenrc` in root workplace

<br />
<br />


## Condition

- asset filename must be `[a-z]`,`[A-Z]`,`[0-9]`, `space` ,`-`,`_`
- filename can only have one `.` for file type
- filename can't be lead with `[0-9]`

<br />
<br />

## Config file

default config file for generated result

``` json

{
  "assets" : {
    "output-path": "lib",
    "filename": "assets.dart"
  }
}

```

<br />
<br />

## Example generated file

``` dart

class Assets {
  const Assets._();

  static const sound = _AssetsSound._();
  static const images = _AssetsImages._();
  ...
}

...

class _AssetsSound {
  const _AssetsSound._();

  static const helloWorldMP3 => "assets/sound/hello world.mp3";
  static const hiACC => "assets/hi.acc";
  ...
}

class _AssetsImages {
  const _AssetsImages._();

  static const icon = _AssetsImagesIcon._();
  static const background = _AssetsImagesBackground._();
  ...
}

class _AssetsImagesIcon {
  const _AssetsImagesIcon._();

  static const chatIconSVG => "assets/images/icon/chatIcon.svg";
  static const facebookPNG => "assets/images/icon/Facebook.png";
  static const googlePlusJPG => "assets/images/icon/google-plus.jps";
  ...
}

...

```

<br />
<br />

## Known Issues

Nothing for now if you need to add function or found an errors please let me know.

<br />
<br />

## Release Notes

### 1.0.0

This is package come from old package `Flutter Generators` that I had unpublish it.
This version I add `.flutgenrc` for config output path and filename.
