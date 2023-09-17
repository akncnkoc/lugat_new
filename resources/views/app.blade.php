<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-app-env="{{ env('APP_ENV') }}">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Lügat</title>
        @viteReactRefresh
        @vite("resources/app/index.tsx")

    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
