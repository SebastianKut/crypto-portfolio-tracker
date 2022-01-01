<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

    <!-- Styles -->
    @env('local')
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    @endenv
    {{-- Different relative path for production as its deployed on subdomain --}}
    @env('production')
    <link rel="stylesheet" href="{{ mix('public/css/app.css') }}">
    @endenv

    <!-- Scripts -->
    @routes

    @env('local')
    <script src="{{ mix('js/app.js') }}" defer></script>
    @endenv
    @env('production')
    <script src="{{ mix('public/js/app.js') }}" defer></script>
    @endenv

</head>

<body class="font-sans antialiased">
    @inertia

    @env ('local')
    <script src="http://localhost:8080/js/bundle.js"></script>
    @endenv
</body>

</html>
