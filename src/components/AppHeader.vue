<script></script>

<template>
    <header class="sticky-top">
        <div class="container">
            <div class="row px-2 px-sm-0">
                <!-- Left side -->
                <!--! Ricerca attiva solo su schermata home -->
                <div class="col-md-1 col-xl-4 d-none d-md-flex justify-content-start">
                    <a class="logo" href="http://localhost:5174/">
                        <img src="src/assets/img/logo.png" alt="logo">
                        <h1 class="d-none d-xl-inline-block">boolbnb</h1>
                    </a>
                </div>

                <!-- Center -->
                <div class="col-11 col-md-6 col-xl-4">
                    <div class="filter-menu">
                        <button class="small-label">
                            <div>Ovunque</div>
                        </button>
                        <span class="separator"></span>

                        <button class="small-label">
                            <div>Qualunque settimana</div>
                        </button>
                        <span class="separator"></span>

                        <button class="small-label">
                            <div>Aggiungi ospiti</div>
                            <div class="icon"><font-awesome-icon icon="magnifying-glass" /></div>
                        </button>
                    </div>
                </div>

                <!-- <div class="col-11 col-md-7 col-xl-8 d-flex justify-content-start">
                    <a class="logo" href="{{ route('guest.home') }}">
                        <img src="{{ asset('img/logo.png') }}" alt="logo">
                        <h1>boolbnb</h1>
                    </a>
                </div> -->

                <!-- Right side -->
                <div class="col-1 col-md-5 d-flex col-xl-4 justify-content-end gap-2">
                    <div class="d-none d-md-flex">
                        <a href="http://127.0.0.1:8000/apartments/create" class="button-light">Apri un Boolbnb</a>

                        <button class="button-light"><font-awesome-icon icon="globe" /></button>
                    </div>

                    <!-- Dropdown -->
                    <div class="login-menu dropdown">
                        <button class="dropdown-toggle d-none d-md-flex align-items-center" data-bs-toggle="dropdown">
                            <font-awesome-icon icon="bars" />
                            <div class="user ms-2">
                                <font-awesome-icon icon="user" />
                            </div>
                        </button>

                        <button class="dropdown-toggle d-flex d-md-none align-items-center" data-bs-toggle="dropdown">
                            <div class="user">
                                <font-awesome-icon icon="user" />
                            </div>
                        </button>

                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="http://127.0.0.1:8000/login"><b>Accedi</b></a></li>
                            <li><a class="dropdown-item" href="http://127.0.0.1:8000/register">Registrati</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss">
@use '../assets/scss/vars' as *;


//__________________ HEADER
header {
    border-bottom: 1px solid $light-grey;
    background-color: white;

    .row {
        @include flex($wrap: nowrap);
        height: 80px;
    }

    div[class*="col"] {
        padding: 0;
        height: 48px
    }

    .dropdown-toggle:after {
        display: none;
    }
}

.logo {
    @include flex;

    img {
        width: 35px;
        margin-right: 5px;
        filter: brightness(0) saturate(100%) invert(36%) sepia(43%) saturate(4027%) hue-rotate(328deg) brightness(99%) contrast(105%);
    }

    h1 {
        @include font(700, 25px, $color: $brand-color, $spacing: -1px);
    }
}

.filter-menu {
    @include flex;
    padding: 0 6px 0 10px;
    border: 1px solid $light-grey;
    border-radius: 40px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: box-shadow 0.2s cubic-bezier(0.2, 0, 0, 1);

    &:hover {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
    }
}

.login-menu {
    @include flex;
}

.small-label {
    @include flex;
    height: 48px;
    flex-grow: 1;
    font-weight: 500;
    overflow: hidden;

    &:last-child {
        @include font(300, $color: grey);
    }

    div {
        padding: 0 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.separator {
    border-right: 1px solid $light-grey;
    height: 24px;
}

.icon {
    @include flex;
    @include circle(32px);
    color: white;
    background-color: $brand-color;
}

.user {
    @include circle(40px);
    @include flex;
    color: white;
    background-color: black;
}

ul.dropdown-menu.show {
    @include font();
}

@media (min-width: 768px) {
    .login-menu {
        padding: 0 6px 0 10px;
        border: 1px solid $light-grey;
        border-radius: 40px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05);
        transition: box-shadow 0.2s cubic-bezier(0.2, 0, 0, 1);

        &:hover {
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
        }
    }

    .user {
        @include circle(30px);
    }
}
</style>