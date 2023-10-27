<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        <meta name="description" content="">
        <link rel="icon" href="{{asset('assets/images/favicon.png')}}" type="image/x-icon">

        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap">
        <link href="{{asset('assets/css/responsive.css')}}" rel="styleshee">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite('resources/js/app.jsx')
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia

        <script>
            const firebaseConfig = {
                apiKey: "AIzaSyDqAAiVhmW5gTI5f6aMwvsJJDjNrv3giLI",
                authDomain: "ee-app-e286a.firebaseapp.com",
                projectId: "ee-app-e286a",
                storageBucket: "ee-app-e286a.appspot.com",
                messagingSenderId: "962507386478",
                appId: "1:962507386478:web:512430e8206846c98d007f",
                measurementId: "G-VLMVQ9FWF2"
            };

            const conifg = {
                "type": "service_account",
                "project_id": "ee-app-e286a",
                "private_key_id": "1c00fdab655c8c02e2c5ab5765b4a90ed39e51ce",
                "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQClcW4NkQlObJrz\nDbE3shVs+Masf8YCV3/WN2rBaH53YQ3crCEuu36hQrrOCEq9U9NU3RW0KVWn9I3T\naiigv4VCG2eMVTFE8CG6eUUS7f5R8glFcaOE3S/1jOmNNDIJJdvdGN8bAbsnBXib\n1IfjPFrEX4+NDoOhTpM/pkc/7Mbb2/YvYd8f0rcAu9vjU2/XWteft0KIOtDKnZ4H\n9Ckm9nhsEPFtQyZWmG6iNTune5xtKB7tp+32DIH3WDjagci4DamX8gdr49OI0Jbx\n/o2eejlsKHlPEFk+ncown88i5bFi3bZa9iKkIu8BJWtS52zAffMyVv/Xdj5328d+\n11H4kUVLAgMBAAECggEAAwdEAwRLmZ1mt4CU5Naqkt6CPuPlmSdxNQr+C4ElQvNs\nfBnmpKlQjR114oT/NCvMJBU8VdYUhvF9SWH7yLwovkO9J5hJn2zKyDHhN5J0jEXJ\njw71wqrzB/URd6MOlnsDXKZH7vCWvR7AWe3hK9UasW+5s3bd6rGtrmfAWlReygdj\n0o8COn00RX5ILK/Tz77TzwAUGw3CywcQ4z2qqDP7dXHz3jVfeLlx0d2nkP/6RgmX\nSQbXF7zRp2q+yGC2wsiTspkQR+PM85P4j8jI5RJF0xeZrmzyVOazyx8QU1yxLWmw\nt6N5o3mlJ1WT4+0SyjFqGtdjUGZgfg8j/3aQDsg6ZQKBgQDTmIwFQ70WtRCThph3\nVsYUIDDxZlXuCvc+G5m89pUUKOt7z9aAh1hYRIMBD+ZaA43QEISUeDb310+MB9Dt\nlCsRExRfsLkvwv6+NBqGtquUITv9sfLRvvrploIpnN6UiJFKEO8qMcd5FF06yn3f\nl7gVAng8yIEpycCptW6fCGVrnwKBgQDIKXDLmut5YRyBKyEGfid/y4wOWmUZjUSk\nW9QA2VAD0ldn9zpePk59TNQ3ZMyMrdkbPStKfLx3jxRcvm0CJJL86DQ6eVDUSjbp\nLQahZOFBQHZAYgw7VzYYVF1tsWabdDOKmY4roywPBXyiVmZBKwi2P4rSCqYL9WjY\nY4UDM7cG1QKBgQC5nJpPT/GCBskIsEv0e5D8PJTSXXPJgaMKv0loImH5sj+Hd3Tx\ngEh1/XtxphHqKi3vM14pox6M4DmuW3jhv1TcAIGhwzNfe0zdanVOcNUn9tNaIwwf\nA8m0uEtr12jEoNvaPeqed9ZEFyIFHXW3eq6G94ijwTrUfl9cP4RPSx00fwKBgCUL\nTl3QOR5Is77QHZeXB3ZmVHBfmHBnLboBaLYTgfSDHDwYjEve2iXkby4lUJoEnrak\n1ns9pJ+38jvL3l7UKAP4cZoU07nGVm1HMP/zrKCn7nqx6rOcy10rV/MyLtw8YEGZ\nc69tznylNlDRDrGm5kDcd7Ox1tNFwvaxTG+wRYJVAoGAT6iJUNjz2evyezwczC6B\nQbidmy/8JWb2BxRiS81OdVrp7i7JQBU5hKMYE4rhCdYddt0sF7n4WbOdiX+dz90m\nWLlUFb7SQ0Cj7uPshU2kxYLo0lRF0pRCWzUbTpeuu+QOZjH5Jl/pEWwrWPii3Jxx\nYVrx3sQ4MV42fyOurudgFaM=\n-----END PRIVATE KEY-----\n",
                "client_email": "firebase-adminsdk-perpt@ee-app-e286a.iam.gserviceaccount.com",
                "client_id": "111233112759165934927",
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-perpt%40ee-app-e286a.iam.gserviceaccount.com"
            }

        </script>
    </body>
</html>
